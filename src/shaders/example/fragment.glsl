uniform float uTime;


void main() {
    gl_FragColor = vec4(sin(uTime) * 0.5 + 0.5, 0.0, cos(uTime) * 0.5 + 0.5, 1.0);
}
