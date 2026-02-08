package in.resuforge.api.Service;

import in.resuforge.api.DTO.AuthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static in.resuforge.api.Utils.AppConstants.PREMIUM;

@RequiredArgsConstructor
@Slf4j
@Service
public class TemplateService {
    private final AuthService authService;

    public Map<String, Object> getTemplate(Object principal) {
        //Step 1: Get The Current Profile
        AuthResponse currentUser = authService.getProfile ( principal );
        //Step 2: Get the available templates based on a profile type
        List<String> availableTemplates;
        boolean isPremium = PREMIUM.equalsIgnoreCase ( currentUser.getSubscriptionPlan ( ) );
        if (isPremium) {
            availableTemplates = List.of ( "01" , "02" , "03" );
        } else {
            availableTemplates = List.of ( "01" );
        }
        //Step 3: Add the data to map and return
        Map<String, Object> restrictions = new HashMap<> ( );
        restrictions.put ( "availableTemplates" , availableTemplates );
        restrictions.put ( "allTemplates" , List.of ( "01" , "02" , "03" ) );
        restrictions.put ( "subscription" , currentUser.getSubscriptionPlan ( ) );
        restrictions.put ( "premium" , isPremium );
        log.info ( "Template Restrictions: {}" , restrictions );
        return restrictions;
    }
}