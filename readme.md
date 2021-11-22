# Velog-Clone-Server

Velog Clone에서 사용할 수 있는 서버입니다.

## 사용법

1. 이 리포지토리를 클론하기
2. `yarn install` 로 디펜던시 설치하기
3. `yarn start` 로 실행하기

## API

### 이미지 업로드

#### POST /api/image

Content-Type: `multipart/form-data`

| 필드 이름 | 필드 값     |
| --------- | ----------- |
| file      | 파일 데이터 |

---

### 이미지 보기

#### GET /api/image/[이미지 Key]

이미지 Key값은 이미지 업로드 때 받았던 `key` 필드 값입니다.
