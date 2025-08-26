varying vec2 vUv;

uniform vec2 u_center;
uniform float u_zoom;
uniform int u_max_iterations;
uniform float u_aspect;
uniform vec3 u_bg_color; // New uniform for the background color

void main(){
    vec2 centered_uv = vUv -0.5;
    centered_uv.x *= u_aspect;
    vec2 c = u_center + centered_uv * 4.0/u_zoom;

    vec2 z = vec2(0.0);
    int i;
    for (i=0; i<u_max_iterations;i++){
        float x = (z.x *z.x - z.y *z.y) + c.x;
        float y = (2.0 * z.x * z.y) + c.y;
        if ((x*x + y*y) > 4.0){
            break;
        }
        z.x =x;
        z.y =y;
    }
    if ( i == u_max_iterations){
        gl_FragColor = vec4(u_bg_color, 1.0);
    } else {
        float sm = float(i) - log2(log2(dot(z,z))) +4.0;
        float r = 0.5 * (1.0 + cos(3.0 + sm * 0.15 + 0.6));
        float g = 0.5 * (1.0 + cos(3.0 + sm * 0.15 + 0.4));
        float b = 0.5 * (1.0 + cos(3.0 + sm * 0.15 + 0.2));
        gl_FragColor = vec4(r, g, b, 1.0);
    }
}