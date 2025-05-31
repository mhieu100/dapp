// package com.dapp.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class PermissionInterceptorConfiguration implements WebMvcConfigurer {
//     @Bean
//     PermissionInterceptor getPermissionInterceptor() {
//         return new PermissionInterceptor();
//     }

//     @Override
//     public void addInterceptors(@SuppressWarnings("null") InterceptorRegistry registry) {
//         String[] whiteList = {
//             "/auth/login", "/auth/register",  "/auth/logout", "/storage/**", "/vaccines/**", "/centers/**"
//     };
//         registry.addInterceptor(getPermissionInterceptor())
//                 .excludePathPatterns(whiteList);
//     }
// }
