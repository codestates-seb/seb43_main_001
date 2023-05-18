package main001.server.security.service;

import main001.server.domain.user.entity.User;

import javax.servlet.http.HttpServletRequest;

public interface SecurityService {
    String delegateAccessToken(User user);
    String delegateRefreshToken(HttpServletRequest request, User user);
    String reissueAccessToken(Long userId);
    String reissueRefreshToken(Long userId);

}
