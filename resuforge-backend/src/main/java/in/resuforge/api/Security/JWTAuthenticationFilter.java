package in.resuforge.api.Security;

import in.resuforge.api.Document.User;
import in.resuforge.api.Repository.UserRepository;
import in.resuforge.api.Utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request , HttpServletResponse response , FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader ( "Authorization" );
        String token = null;
        String userId = null;

        if (authHeader != null && authHeader.startsWith ( "Bearer" )) {
            token = authHeader.substring ( 7 );
            try {
                userId = jwtUtils.extractUserIdFromToken ( token );
            } catch (Exception ex) {
                log.error ( "Token is not valid or not available" );
            }
        }
        // Set The Security Context
        if (userId != null && SecurityContextHolder.getContext ( ).getAuthentication ( ) == null) {
            try {
                if (jwtUtils.validateToken ( token ) && !jwtUtils.isTokenExpired ( token )) {
                    User user = userRepository.findById ( userId )
                            .orElseThrow ( () -> new UsernameNotFoundException ( "User not found with id: " ) );
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken ( user , null , new ArrayList<> ( ) );
                    authToken.setDetails ( new WebAuthenticationDetailsSource ( ).buildDetails ( request ) );
                    SecurityContextHolder.getContext ( ).setAuthentication ( authToken );
                }
            } catch (Exception ex) {
                log.error ( "Token validation failed not able to set the security context: {}" , ex.getMessage ( ) );
            }
        }
        filterChain.doFilter ( request , response );
    }
}
