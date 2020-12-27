// App.js
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import CameraController from "./components/CameraController";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import styles from "./styles";
import { createGlobalState } from "react-hooks-global-state";

const DropBox = (props) => {
  // const [count, setCount] = useState(3);
  // useRef();
  const [ref] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    ...props
  }));

  return (
    // <instancedMesh ref={ref} args={[null, null, count]}>
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
    // </instancedMesh>
  );
};

const CreateBox = () => {
  const [boxes] = useState([
    { position: [0, 8, 0] },
    { position: [0, 50, 0] },
    { position: [0, 70, 0] }
  ]);
  return boxes.map((props) => <DropBox {...props} />);
};

const Floor = ({ position, args, color }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: args,
    position: position
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

/*
 * 1. 表示される入り口
 */
const App = () => {
  return (
    <View style={styles.app}>
      <Canvas camera={{ position: [0, 5, 10], near: 0.1, far: 500 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[20, 20, 20]} angle={0.25} penumbra={0.5} />
        <pointLight position={[-10, -10, -10]} />
        <CameraController />
        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ restitution: 0.5 }}
        >
          <DropBox position={[1, 1, 0]} />
          <CreateBox />
          <Floor position={[0, 0, 0]} args={[5, 0.5, 5]} color={"#ed553b"} />
          <Floor position={[0, -4, 0]} args={[15, 0.5, 15]} color={"#173f5f"} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
