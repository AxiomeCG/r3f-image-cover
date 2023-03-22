uniform sampler2D uTexture;

uniform float uScaleFactorX;
uniform float uScaleFactorY;

varying vec2 vUv;

void main() {

    vec2 st = (vUv * 2.0 - 1.0);
    st.x *= uScaleFactorX;
    st.y *= uScaleFactorY;

    st = st * 0.5 + 0.5;

    gl_FragColor = texture(uTexture, st );
}
