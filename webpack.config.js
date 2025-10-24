/**
 * Webpack 설정 파일
 * 
 * 일반적인 작성 규칙:
 * 1. entry: 진입점은 보통 src/index.js 또는 src/main.js
 * 2. output: dist 폴더에 번들 파일 생성이 일반적
 * 3. mode: development(개발) 또는 production(배포) 모드
 * 4. optimization: 프로덕션에서는 압축 활성화, 개발에서는 소스맵 유지
 * 5. resolve: 자주 사용하는 확장자들을 배열로 명시
 * 6. plugins: 필요한 플러그인들을 순서대로 추가
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  // 진입점 파일 (일반적으로 src/index.js 또는 src/main.js 사용)
  entry: './src/index.js',
  
  // 출력 설정 (보통 dist 폴더에 번들 파일 생성)
  output: {
    path: path.resolve(__dirname, 'dist'), // 절대 경로 사용 권장
    filename: 'cdn_test1.js', // 파일명 패턴 예시: '[name].js', '[name].[hash].js', '[name].[chunkhash:8].js', '[id].js'
    // 네이밍 컨벤션: kebab-case (cdn-test1.js), snake_case (cdn_test1.js), camelCase (cdnTest1.js), PascalCase (CdnTest1.js)
    library: {
      type: 'var', // 'var', 'this', 'window', 'global', 'commonjs2' 등
      name: 'cdnTest1' // 전역 변수명 (camelCase 권장)
    },
    clean: true // webpack 5+ 에서는 clean-webpack-plugin 대신 clean 옵션 사용
  },
  
  // 모드 설정 (development: 개발용, production: 배포용)
  mode: 'production',
  
  // 최적화 설정 (프로덕션에서는 압축 활성화 권장)
  optimization: {
    minimize: false, // 프로덕션에서는 true 권장
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // 라이선스 주석 제거
          },
        },
        extractComments: false, // 별도 파일로 주석 추출하지 않음
      }),
    ],
  },
  
  // 모듈 해석 설정 (자주 사용하는 확장자 우선순위로 배열)
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] 
  },
  
  // 플러그인 설정 (순서대로 실행됨)
  plugins: [
    // 빌드 타임 상수 주입
    new webpack.DefinePlugin({
      __PLUGIN_NAME__: JSON.stringify(pkg.name),
      __PLUGIN_VERSION__: JSON.stringify(pkg.version),
      __PLUGIN_DESCRIPTION__: JSON.stringify(pkg.description),
    }),

    // 배너 (package.json 기반)
    new webpack.BannerPlugin({
      banner: `//@name ${pkg.name}
//@display-name ${pkg.name}_v${pkg.version}
//@version ${pkg.version}
//@description ${pkg.description}
//@unpkg https://unpkg.com/${pkg.name}@${pkg.version}/dist/cdn_test1.js`,
      raw: true // 원시 문자열로 처리 (헤더 주석용)
    })
  ],
};

