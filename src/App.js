// App.js
import React, { useState } from "react";
import { View } from "react-native";
import { Canvas } from "react-three-fiber";
import CameraController from "./components/CameraController";
import { Physics, useBox } from "use-cannon";
import styles from "./styles";

/**
 * 落ちてくるボックス
 */
const DropBox = (props) => {
  const [ref] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    ...props
  }));

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={"orange"} />
    </mesh>
  );
};

/**
 * DropBoxを配列の位置に設置
 */
const CreateBox = () => {
  const [boxes] = useState([
    { position: [0, 8, 0] },
    { position: [0, 50, 0] },
    { position: [0, 70, 0] }
  ]);
  return boxes.map((props) => <DropBox {...props} />);
};

/**
 * 動かない床
 */
const Floor = ({ position, args, color }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: args,
    position: position
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <View style={styles.app}>
      <Canvas shadowMap camera={{ position: [0, 3, 10], near: 0.1, far: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          position={[2, 10, 6]}
          angle={0.8}
          penumbra={0.5}
          intensity={1}
          castShadow
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        {/* <pointLight position={[-10, -10, -10]} /> */}
        <CameraController />
        {/* Physicsの中にあるオブジェクトが物理演算される 
        https://github.com/pmndrs/use-cannon
        現在react-three-fiber バージョン5にuse-cannonが対応していない */}
        <Physics
          // 重力設定
          gravity={[0, -30, 0]}
          // restitution=反発係数
          defaultContactMaterial={{ restitution: 0.6 }}
        >
          {/* 落ちてくるボックス */}
          <DropBox position={[1, 1, 0]} />
          {/* 配列のポジションにDropBoxを設置 */}
          <CreateBox />
          {/* 床を設置 */}
          <Floor position={[0, 0, 0]} args={[5, 0.5, 5]} color={"#ed553b"} />
          <Floor position={[0, -4, 0]} args={[15, 0.5, 15]} color={"#173f5f"} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
