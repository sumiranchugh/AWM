package org.rssb.awm;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Sumiran Chugh on 3/23/2016.
 *
 * @copyright atlas
 */
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {


    public static void main(String args[]) {
        new SpringApplicationBuilder(Application.class).run(args);
    }
}
