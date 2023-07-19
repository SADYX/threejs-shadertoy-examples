'use client'

import styles from './page.module.sass'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef, useState } from 'react';
import threeInit, { ThreeParams } from './utils/three-init';
import createGeometryByString from './utils/geometries';
import * as THREE from 'three';
import { SHADER_CONFIG } from './config/shader-config';

export default function Home() {
	const threeRef = useRef<HTMLDivElement>(null);
	const speedRef = useRef<number>(1);
	const resolutionRef = useRef<[number, number]>([400, 400]);
	const [threeParams, setThreeParams] = useState<ThreeParams>();
	const { geometryType, shaderType, speed, resolution_X, resolution_Y } = useControls({
		geometryType: {
			options: [
				'Box',
				'Sphere',
				'Plane',
			],
		},
		shaderType: {
			options: SHADER_CONFIG.map(({ label }) => label),
		},
		speed: {
			min: 0,
			max: 10,
			step: 0.1,
			value: 1,
		},
		resolution_X: {
			min: 1,
			max: 800,
			step: 1,
			value: 400,
		},
		resolution_Y: {
			min: 1,
			max: 800,
			step: 1,
			value: 400,
		},
	});

	const geometry = useMemo(() => {
		return createGeometryByString(geometryType);
	}, [geometryType]);

	const { fc: material, sourceCodeUrl } = useMemo(() => {
		return SHADER_CONFIG!.find(({ label }) => label === shaderType)!;
	}, [shaderType]);

	useEffect(() => {
		speedRef.current = speed;
	}, [speed]);

	useEffect(() => {
		resolutionRef.current = [resolution_X, resolution_Y];
	}, [resolution_X, resolution_Y]);

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

		const animate = () => {
			idAnimateFrame = requestAnimationFrame(animate);
			has_iTime && (material.uniforms.iTime.value += clock.getDelta() * speedRef.current);
			if (has_iResolution) {
				material.uniforms.iResolution.value.setX(resolutionRef.current[0]);
				material.uniforms.iResolution.value.setY(resolutionRef.current[1]);
			}
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
		}

		window.addEventListener('resize', onResize);
		animate();
		onResize();

		return () => {
			cancelAnimationFrame(idAnimateFrame);
			threeParams.scene.remove(mesh);
			window.removeEventListener('resize', onResize);
		}
	}, [geometry, material, threeParams]);

	return (
		<div className={styles.container}>
			<div className={styles.three} ref={threeRef} />
			<div className={styles.url}>
				<span className={styles.prefix}>Shader Source Code:</span>
				<a
					className={styles.content}
					href={sourceCodeUrl}
					target='_blank'
				>{sourceCodeUrl}</a>
			</div>
		</div>
	)
}
