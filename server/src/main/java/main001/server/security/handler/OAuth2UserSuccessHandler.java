package main001.server.security.handler;

import lombok.RequiredArgsConstructor;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.service.UserService;
import main001.server.security.service.SecurityService;
import main001.server.security.utils.CustomAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@RequiredArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final CustomAuthorityUtils authorityUtils;
    private final SecurityService securityService;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String registrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
        String oauthId = String.valueOf(oAuth2User.getAttributes().get("id"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String name = String.valueOf(oAuth2User.getAttributes().get("name"));
        String profileImg = String.valueOf(oAuth2User.getAttributes().get("avatar_url"));

        if (registrationId.equals("google")) {
            oauthId = String.valueOf(oAuth2User.getAttributes().get("sub"));
            profileImg = String.valueOf(oAuth2User.getAttributes().get("picture"));
        }

        if (userService.isExistOAuth2User(oauthId)) {
            User user = userService.findExistOAuth2User(oauthId);
            redirect(request, response, user);
        } else if (email.equals("null") || email.isEmpty()) {
            User savedUser = saveUser(email, oauthId, name, profileImg);
            long userId = savedUser.getUserId();
            String addemail = UriComponentsBuilder
                    .newInstance()
                    .scheme("http")
                    .host("localhost")
                    .port(3000)
                    .path("/addemail") // addemail 페이지로 이동
                    .queryParam("userId", userId)
                    .build()
                    .toUri().toString();
            getRedirectStrategy().sendRedirect(request, response, addemail);
        } else {
            User savedUser = saveUser(email, oauthId, name, profileImg);
            redirect(request, response, savedUser);
        }
    }
    private User saveUser(String email, String oauthId, String name, String profileImg) {
        User user = new User(email, oauthId, name, profileImg);
        user.setRoles(authorityUtils.createRoles(email));
        user.setAuth(true);
        userService.createUser(user);

        return user;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user) throws IOException {
        String accessToken = securityService.delegateAccessToken(user);
        String refreshToken = securityService.delegateRefreshToken(request, user);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request,response,uri);
    }
    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000) // 프론트 테스트
//                .port(80) // 배포
                .path("/") // 로그인 후 홈으로 이동
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}