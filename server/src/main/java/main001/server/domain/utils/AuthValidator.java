package main001.server.domain.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;

public class AuthValidator {

    /**
     * IsAuth 기능 구현
     */
    public static boolean isAuth(long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String principal = authentication.getName();

        return  principal.equals(String.valueOf(userId));
    }
}
