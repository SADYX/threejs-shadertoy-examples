'use client'

import Image from 'next/image'
import styles from './page.module.sass'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef, useState } from 'react';
import threeInit, { ThreeParams } from './utils/three-init';
import createGeometryByString from './utils/geometries';
import * as THREE from 'three';
import createMaterialByString from './utils/materials';

export default function Home() {
	const threeRef = useRef<HTMLDivElement>(null);
	const speedRef = useRef<number>(1);
	const [threeParams, setThreeParams] = useState<ThreeParams>();
	const { geometryType, shaderType, speed } = useControls({
		geometryType: {
			options: [
				'Box',
				'Sphere',
				'Plane',
			],
		},
		shaderType: {
			options: [
				'Psychedelix',
			]
		},
		speed: {
			min: 0,
			max: 10,
			step: 0.1,
			value: 1,
		}
	});

	const geometry = useMemo(() => {
		return createGeometryByString(geometryType);
	}, [geometryType]);

	const material = useMemo(() => {
		return createMaterialByString(shaderType);
	}, [shaderType]);

	useEffect(() => {
		speedRef.current = speed;
	}, [speed]);

	// init scene
	useEffect(() => {
		const threeDom = threeRef.current;
		if (!threeDom) return;

		const threeItems = threeInit(threeDom);
		setThreeParams(threeItems);

		const {
			camera,
		} = threeItems;

		camera.position.set(30, 30, 30);

	}, []);

	// mesh
	useEffect(() => {
		const threeDom = threeRef.current;
		if (!threeParams || !threeDom) return;
		const {
			camera,
			renderer,
			scene,
			orbitControl,
		} = threeParams;
		let idAnimateFrame = 0;
		let has_iTime = material.uniforms.iTime !== undefined;
		let has_iResolution = material.uniforms.iResolution !== undefined;
		const clock = new THREE.Clock();
		const mesh = new THREE.Mesh(geometry, material);
		threeParams.scene.add(mesh);

		const animte = () => {
			idAnimateFrame = requestAnimationFrame(animte);
			has_iTime && (material.uniforms.iTime.value += clock.getDelta() * speedRef.current);
			orbitControl.update();
			renderer.render(scene, camera);
		}

		const onResize = () => {
			const {
				clientWidth: width,
				clientHeight: height,
			} = threeDom;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
			if (has_iResolution) {
				material.uniforms.iResolution.value.setX(width);
				material.uniforms.iResolution.value.setY(height);
			}
		}

		window.addEventListener('resize', onResize);
		animte();

		return () => {
			cancelAnimationFrame(idAnimateFrame);
			threeParams.scene.remove(mesh);
			window.removeEventListener('resize', onResize);
		}
	}, [geometry, material, threeParams]);

	return (
		<div className={styles.container}>
			<div className={styles.three} ref={threeRef} />
		</div>
	)
}
