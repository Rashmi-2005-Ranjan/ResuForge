package in.resuforge.api.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JWTUtils {

    @Value("${jwt.secret.key}")
    private String jwtSecret;

    @Value("${jwt.expires.in}")
    private Long jwtExpiration;

    public String generateToken(String userId) {
        Date now = new Date ( );
        Date expiryDate = new Date ( now.getTime ( ) + jwtExpiration );
        return Jwts.builder ( )
                .setSubject ( userId )
                .setIssuedAt ( now )
                .setExpiration ( expiryDate )
                .signWith ( getSigningKey ( ) )
                .compact ( );
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor ( jwtSecret.getBytes ( ) );
    }

    public String extractUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder ( )
                    .setSigningKey ( getSigningKey ( ) )
                    .build ( )
                    .parseClaimsJws ( token )
                    .getBody ( );
            return claims.getSubject ( );
        } catch (JwtException | IllegalArgumentException ex) {
            log.error ( "Token is malformed or not available" );
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder ( )
                    .setSigningKey ( getSigningKey ( ) )
                    .build ( )
                    .parseClaimsJws ( token );
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            log.error ( "Token is not valid" );
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parserBuilder ( )
                    .setSigningKey ( getSigningKey ( ) )
                    .build ( )
                    .parseClaimsJws ( token )
                    .getBody ( );
            return claims.getExpiration ( ).before ( new Date ( ) );
        } catch (JwtException | IllegalArgumentException ex) {
            log.error ( "Token is not expired" );
            return true;
        }
    }
}