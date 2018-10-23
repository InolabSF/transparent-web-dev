(() => {

  window.addEventListener('load', () => {

            // Array Shuffle
            function arreyShuffle(array){
                for(var i = array.length - 1; i > 0; i--){
                        var r = Math.floor(Math.random() * (i + 1));
                        var tmp = array[i];
                        array[i] = array[r];
                        array[r] = tmp;
                }
            }

			var camera, scene, renderer;
			var cube, sphere, torus, material;

			var count = 0, cubeCamera1, cubeCamera2;

			var lon = 0, lat = 0;
			var phi = 0, theta = 0;

			var targetDOM = document.getElementById('webgl');

			var textureLoader = new THREE.TextureLoader();
      
            var sceneTexture = ['./assets/img/opening/scene01.jpg','./assets/img/opening/scene02.jpg','./assets/img/opening/scene03.jpg','./assets/img/opening/scene04.jpg','./assets/img/opening/scene05.jpg','./assets/img/opening/scene06.jpg','./assets/img/opening/scene07.jpg','./assets/img/opening/scene08.jpg','./assets/img/opening/scene09.jpg','./assets/img/opening/scene10.jpg','./assets/img/opening/scene11.jpg'];
            arreyShuffle(sceneTexture);

			textureLoader.load( sceneTexture[0], function ( texture ) {

				texture.mapping = THREE.UVMapping;

				init( texture );
				animate();

			} );

			function init( texture ) {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

				scene = new THREE.Scene();

				var mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 500, 32, 16 ), new THREE.MeshBasicMaterial( { map: texture } ) );
				mesh.geometry.scale( 1, 1,-  1 );
				mesh.rotation.z = Math.PI / 2 / 2;
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				//renderer.setPixelRatio( window.devicePixelRatio ); //chrome TEST fit size
				renderer.setSize( window.innerWidth, window.innerHeight );

				cubeCamera1 = new THREE.CubeCamera( 1, 1000, 256 );
				cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
				scene.add( cubeCamera1 );

				cubeCamera2 = new THREE.CubeCamera( 1, 1000, 256 );
				cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
				scene.add( cubeCamera2 );

				targetDOM.appendChild(renderer.domElement);

				//

				var loader = new THREE.SVGLoader();
				loader.load( './assets/img/opening/text01.svg', function ( paths ) {

					var group01 = new THREE.Group();
					group01.scale.multiplyScalar( 0.2 );
					group01.position.x = -250;
					group01.position.y = 250;
					group01.position.z = 240;
					group01.scale.y *= -1;
					group01.rotation.y = 1.525;

					for ( var i = 0; i < paths.length; i ++ ) {

						var path = paths[ i ];

						var material = new THREE.MeshBasicMaterial( {
							color: path.color,
							side: THREE.DoubleSide,
							depthWrite: false
						} );

						var shapes = path.toShapes( true );

						for ( var j = 0; j < shapes.length; j ++ ) {

							var shape = shapes[ j ];

							var geometry = new THREE.ShapeBufferGeometry( shape );
							var mesh = new THREE.Mesh( geometry, material );

							group01.add( mesh );

						}

					}

					scene.add( group01 );

				});
				
				loader.load( './assets/img/opening/text02.svg', function ( paths ) {

					var group02 = new THREE.Group();
					group02.scale.multiplyScalar( 0.2 );
					group02.position.x = 250;
					group02.position.y = 250;
					group02.position.z = 250;
					group02.scale.y *= -1;
					group02.rotation.y = 1.525;

					for ( var i = 0; i < paths.length; i ++ ) {

						var path = paths[ i ];

						var material = new THREE.MeshBasicMaterial( {
							color: path.color,
							side: THREE.DoubleSide,
							depthWrite: false
						} );

						var shapes = path.toShapes( true );

						for ( var j = 0; j < shapes.length; j ++ ) {

							var shape = shapes[ j ];

							var geometry = new THREE.ShapeBufferGeometry( shape );
							var mesh = new THREE.Mesh( geometry, material );

							group02.add( mesh );

						}

					}

					scene.add( group02 );

				});
				
				var cubeShader = THREE.ShaderLib[ "cube" ];
				material = new THREE.MeshBasicMaterial( {
					envMap: cubeCamera2.renderTarget.texture,
					side: THREE.BackSide
				} );

				sphere = new THREE.Mesh( new THREE.IcosahedronBufferGeometry( 20, 3 ), material );
				scene.add( sphere );

				window.addEventListener( 'resize', onWindowResized, false );

			}

			function onWindowResized( event ) {

				//renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			var requestId;
            
            var btn = document.createElement('input');
            btn.type = 'button';
            btn.setAttribute('id', 'webgl-stop');
            btn.style.cssText = 'position: absolute; display: none;';
            btn.onclick = (function(){ stop(); return });
            targetDOM.appendChild(btn);
            
            function animate() {
                
                requestId = undefined;
                
                start();
				render();

			}
      
            function start() {
                if (!requestId) {
                   requestId = window.requestAnimationFrame( animate );
                }
            }
      
            function stop() {
                if (requestId) {
                   window.cancelAnimationFrame(requestId);
                   requestId = undefined;
                }
            }

			function render() {

				lon += .15;

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				camera.position.y = 100 * Math.cos( phi );
				camera.position.x = 100 * Math.sin( phi ) * Math.cos( theta );
				camera.position.z = 100 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( scene.position );

				sphere.visible = false;

				// pingpong

				if ( count % 2 === 0 ) {

					material.envMap = cubeCamera2.renderTarget.texture;
					cubeCamera1.update( renderer, scene );

				} else {

					material.envMap = cubeCamera1.renderTarget.texture;
					cubeCamera2.update( renderer, scene );

				}

				count ++;

				sphere.visible = true;

				renderer.render( scene, camera );
                
                // 画像切り換え用リロード
                if ( count / ( 2400 * 2 ) === 1 ) {
                    
                    location.reload();
                }

			}

  }, false);
})();