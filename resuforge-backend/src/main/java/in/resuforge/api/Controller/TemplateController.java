package in.resuforge.api.Controller;

import in.resuforge.api.Service.TemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static in.resuforge.api.Utils.AppConstants.GET_TEMPLATES;
import static in.resuforge.api.Utils.AppConstants.TEMPLATES_CONTROLLER;

@RestController
@RequiredArgsConstructor
@RequestMapping(TEMPLATES_CONTROLLER)
@Slf4j
public class TemplateController {
    private final TemplateService templateService;

    @GetMapping(GET_TEMPLATES)
    public ResponseEntity<?> getTemplates(Authentication authentication) {
        //Call service to get template
        Map<String, Object> templates = templateService.getTemplate ( authentication.getPrincipal ( ) );
        //Return response
        return ResponseEntity.ok ( templates );
    }
}
