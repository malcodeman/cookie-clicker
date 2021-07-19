import React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = React.useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={(viewport.width / 5) * (active ? 1.5 : 1)}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default Box;
