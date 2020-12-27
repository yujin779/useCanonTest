// App.js
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import CameraController from "./components/CameraController";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import styles from "./styles";
import { createGlobalState } from "react-hooks-global-state";

const DropBox = () => {
  const [ref] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 7, 0]
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
};

const CreateBox = () => {

 useEffect(
    () =>
      // 一定時間ごとに処理をおこなう
      void setInterval(
        () =>
          /**
           * ./resources/helpersからインポートされたsvgの配列番号を順次変更
           */
          {console.log("a")},
        // 3秒ごとに実行
        3000
      ),
    //第2引数を空要素にすることにより
    //マウント・アンマウント時のみ第１引数の関数を実行
    []
  )


  return <DropBox />;
};

const Floor = ({ position, args }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: args,
    position: position
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={"hotpink"} />
    </mesh>
  );
};

/*
 * 1. 表示される入り口
 */
const App = () => {
  return (
    <View style={styles.app}>
      <Canvas camera={{ position: [0, 2, 10], near: 0.1, far: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <CameraController />
        <Physics
          gravity={[0, -30, 0]}
          defaultContactMaterial={{ restitution: 0.5 }}
        >
          {/* <DropBox /> */}
          <CreateBox />
          <Floor position={[0, 0, 0]} args={[5, 0.3, 5]} />
          <Floor position={[0, -4, 0]} args={[15, 0.3, 15]} />
        </Physics>
      </Canvas>
    </View>
  );
};
export default App;
