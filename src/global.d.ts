/// <reference types="react" />
/// <reference types="three" />

// Ajoute les types manquants pour react-three-fiber
import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      boxGeometry: ReactThreeFiber.Object3DNode<THREE.BoxGeometry, typeof THREE.BoxGeometry>;
      meshStandardMaterial: ReactThreeFiber.Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    }
  }
}
