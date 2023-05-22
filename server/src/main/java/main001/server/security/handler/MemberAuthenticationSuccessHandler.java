package main001.server.security.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main001.server.config.EnvConfig;
import main001.server.domain.user.entity.User;
import main001.server.security.service.SecurityService;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final SecurityService securityService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("# Authenticated successfully!");

        User user = (User) authentication.getPrincipal();

        String accessToken = securityService.delegateAccessToken(user);
        String refreshToken = securityService.delegateRefreshToken(request, user);

        String url = createURI(accessToken, refreshToken).toString();

        getRedirectStrategy().sendRedirect(request, response, url);
    }
    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(EnvConfig.getBaseUrl())
                .port(EnvConfig.getBasePort())
                .path("/") // 로그인 후 홈으로 이동
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
