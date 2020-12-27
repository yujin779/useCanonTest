import React, { useRef, useState } from "react";
import * as THREE from "three";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import { createGlobalState } from "react-hooks-global-state";

/*
 * 1. 表示される入り口
 */
const Floor = () => {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    args: [10, 1, 10],
    position: [0, -1, 0]
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[10, 1, 10]} />
      <meshStandardMaterial attach="material" color={"hotpink"} />
    </mesh>
  );
};
export default Floor;
