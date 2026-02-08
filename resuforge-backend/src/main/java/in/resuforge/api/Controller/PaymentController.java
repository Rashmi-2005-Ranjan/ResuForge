package in.resuforge.api.Controller;

import com.razorpay.RazorpayException;
import in.resuforge.api.Document.Payment;
import in.resuforge.api.Service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import static in.resuforge.api.Utils.AppConstants.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(PAYMENT_CONTROLLER)
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping(CREATE_RAZORPAY_ORDER)
    public ResponseEntity<?> createOrder(@RequestBody Map<String, String> request , Authentication authentication) throws RazorpayException {
        //Step 1: Validate the request parameters (amount, currency, etc.)
        String planType = request.get ( "planType" );
        if (!PREMIUM.equalsIgnoreCase ( planType )) {
            return ResponseEntity.badRequest ( ).body ( Map.of ( "message" , "Invalid Plan Type" ) );
        }
        //Step 2: Call the service method to create a Razorpay order
        Payment payment = paymentService.createOrder ( authentication.getPrincipal ( ) , planType );
        //Step 3: Prepare the response and return it to the client
        Map<String, Object> response = Map.of (
                "orderId" , payment.getRazorpayOrderId ( ) ,
                "amount" , payment.getAmount ( ) ,
                "currency" , payment.getCurrency ( ) ,
                "receipt" , payment.getReceipt ( )
        );
        return ResponseEntity.ok ( response );
    }

    @PostMapping(VERIFY_RAZORPAY_PAYMENT)
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) throws RazorpayException {
        //Step 1: Validate the request parameters (razorpayOrderId, razorpayPaymentId, razorpaySignature)
        String razorpayOrderId = request.get ( "razorpay_order_id" );
        String razorpayPaymentId = request.get ( "razorpay_payment_id" );
        String razorpaySignature = request.get ( "razorpay_signature" );
        if (Objects.isNull ( razorpayOrderId ) || Objects.isNull ( razorpayPaymentId ) || Objects.isNull ( razorpaySignature )) {
            return ResponseEntity.badRequest ( ).body ( Map.of ( "message" , "Missing required parameters" ) );
        }
        //Step 2: Call the service method to verify the payment
        boolean isVerified = paymentService.verifyPayment ( razorpayOrderId , razorpayPaymentId , razorpaySignature );
        //Step 3: Prepare the response and return it to the client
        if (isVerified) {
            return ResponseEntity.ok ( Map.of ( "message" , "Payment verified successfully" , "status" , "success" ) );
        } else {
            return ResponseEntity.badRequest ( ).body ( Map.of ( "message" , "Payment verification failed" ) );
        }
    }

    @GetMapping(GET_RAZORPAY_PAYMENT_HISTORY)
    public ResponseEntity<?> getPaymentHistory(Authentication authentication) {
        //Step 1: Call The Service Method to get Payment History
        List<Payment> payments = paymentService.getUserPayments ( authentication.getPrincipal ( ) );
        //Step 2: Return Response Entity
        return ResponseEntity.ok ( payments );
    }

    @GetMapping(GET_RAZORPAY_ORDER_DETAILS)
    public ResponseEntity<?> getOrderDetails(@PathVariable String orderId) {
        //Step 1: Call The Service Method
        Payment paymentDetails = paymentService.getPaymentDetails ( orderId );
        //Step 2: Return Response Entity
        return ResponseEntity.ok ( paymentDetails );
    }
}
