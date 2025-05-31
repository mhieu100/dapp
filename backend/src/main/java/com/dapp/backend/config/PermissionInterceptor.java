// package com.dapp.backend.config;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.servlet.http.HttpSession;

// import org.springframework.transaction.annotation.Transactional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.servlet.HandlerInterceptor;
// import org.springframework.web.servlet.HandlerMapping;

// import com.dapp.backend.exception.PermissionException;
// import com.dapp.backend.model.Permission;
// import com.dapp.backend.model.Role;
// import com.dapp.backend.model.User;
// import com.dapp.backend.service.UserService;

// import java.util.List;

// public class PermissionInterceptor implements HandlerInterceptor {

//     @Autowired
//     UserService userService;

//     @Override
//     @Transactional
//     public boolean preHandle(
//             HttpServletRequest request,
//             HttpServletResponse response, Object handler)
//             throws Exception {

//         String path = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
//         String requestURI = request.getRequestURI();
//         String httpMethod = request.getMethod();
//         System.out.println(">>> RUN preHandle");
//         System.out.println(">>> path= " + path);
//         System.out.println(">>> httpMethod= " + httpMethod);
//         System.out.println(">>> requestURI= " + requestURI);

//         HttpSession session = request.getSession(false); // Get session if exists, don't create new one
//         String walletAddress = "";

//         if (session != null) {
//             walletAddress = userService.getUserByWalletAddress((String) session.getAttribute("walletAddress")).isPresent() 
//                 ? (String) session.getAttribute("walletAddress") 
//                 : "";
//         }
//         if (!walletAddress.isEmpty()) {
//             User user = this.userService.getUserByWalletAddress(walletAddress).get();
//             if (user != null) {
//                 Role role = user.getRole();
//                 if (role != null) {
//                     List<Permission> permissions = role.getPermissions();
//                     boolean isAllow = permissions.stream().anyMatch(item -> item.getApiPath().equals(path)
//                             && item.getMethod().equals(httpMethod));

//                     if (!isAllow) {
//                         throw new PermissionException("Bạn không có quyền truy cập endpoint này.");
//                     }
//                 } else {
//                     throw new PermissionException("Bạn không có quyền truy cập endpoint này.");
//                 }
//             }
//         }

//         return true;
//     }
// }
