package in.resuforge.api.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import in.resuforge.api.DTO.AuthResponse;
import in.resuforge.api.Document.Payment;
import in.resuforge.api.Document.User;
import in.resuforge.api.Repository.PaymentRepository;
import in.resuforge.api.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static in.resuforge.api.Utils.AppConstants.PREMIUM;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    public Payment createOrder(Object principal , String planType) throws RazorpayException {
        //Initial Step
        AuthResponse authResponse = authService.getProfile ( principal );
        //Step 1: Initialize the razorpay client with the API keys
        RazorpayClient razorpayClient = new RazorpayClient ( razorpayKeyId , razorpaySecret );
        //Step 2: Prepare the JSON Object with order details (amount, currency, receipt, etc.)
        int amount = 99900; // Amount in paise (e.g., 999.00 INR = 99900 paise)
        String currency = "INR";
        String receipt = PREMIUM + "_" + UUID.randomUUID ( ).toString ( ).substring ( 0 , 8 ); // Unique receipt ID for the order

        JSONObject orderRequest = new JSONObject ( );
        orderRequest.put ( "amount" , amount );
        orderRequest.put ( "currency" , currency );
        orderRequest.put ( "receipt" , receipt );
        //Step 3: Call the Razorpay API to create the order and get the response
        Order razorpayOrder = razorpayClient.orders.create ( orderRequest );
        //Step 4: Save the order details in the database and return the payment object
        Payment newPayment = Payment.builder ( )
                .userId ( authResponse.getId ( ) )
                .razorpayOrderId ( razorpayOrder.get ( "id" ) )
                .amount ( razorpayOrder.get ( "amount" ) )
                .planType ( planType )
                .status ( "created" )
                .receipt ( receipt )
                .currency ( currency )
                .build ( );
        return paymentRepository.save ( newPayment );
    }

    public boolean verifyPayment(String razorpayOrderId , String razorpayPaymentId , String razorpaySignature) throws RazorpayException {
        try {
            JSONObject attribute = new JSONObject ( );
            attribute.put ( "razorpay_order_id" , razorpayOrderId );
            attribute.put ( "razorpay_payment_id" , razorpayPaymentId );
            attribute.put ( "razorpay_signature" , razorpaySignature );

            boolean isValidSignature = Utils.verifyPaymentSignature ( attribute , razorpaySecret );

            if (isValidSignature) {
                //Update Payment Status in DB
                Payment payment = paymentRepository.findByRazorpayOrderId ( razorpayOrderId )
                        .orElseThrow ( () -> new RuntimeException ( "Order ID not found: " + razorpayOrderId ) );
                payment.setRazorpayPaymentId ( razorpayPaymentId );
                payment.setRazorpaySignature ( razorpaySignature );
                payment.setStatus ( "paid" );
                paymentRepository.save ( payment );

                //Update User's premium status
                upgradeUserToPremium ( payment.getUserId ( ) , payment.getPlanType ( ) );
                log.info ( "User with ID {} upgraded to premium plan {}" , payment.getUserId ( ) , payment.getPlanType ( ) );
                return true;
            }
        } catch (Exception ex) {
            log.error ( "Error verifying payment: {}" , ex.getMessage ( ) );
            return false;
        }
        return false;
    }

    private void upgradeUserToPremium(String userId , String planType) {
        User existingUser = userRepository.findById ( userId )
                .orElseThrow ( () -> new RuntimeException ( "User not found with ID: " + userId ) );
        existingUser.setSubscriptionPlan ( planType );
        userRepository.save ( existingUser );
        log.info ( "User upgraded to plan {} with id {}" , planType , userId );
    }

    public List<Payment> getUserPayments(Object principal) {
        AuthResponse profile = authService.getProfile ( principal );
        return paymentRepository.findByUserIdOrderByCreatedAtDesc ( profile.getId ( ) );
    }

    public Payment getPaymentDetails(String orderId) {
        return paymentRepository.findByRazorpayOrderId ( orderId )
                .orElseThrow ( () -> new RuntimeException ( "Payment not found with orderId: " + orderId ) );
    }
}
