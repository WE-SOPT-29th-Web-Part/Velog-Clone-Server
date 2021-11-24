# Velog-Clone-Server

Velog Clone에서 사용할 수 있는 서버입니다.

## 사용법

1. 이 리포지토리를 클론하기
2. `yarn install` 로 디펜던시 설치하기
3. `yarn start` 로 실행하기

## API

### 글 보기

#### GET /api/article/[Article 아이디]

Article
| 필드 이름 | 필드 값 | 타입 |
| --------- | ----------------- | --- |
| id | Article 아이디 | string |
| title | 제목 | string |
| body | 내용 | string |
| summary | 요약 | string |
| thumbnail | 썸네일 이미지 URL | string |
| tags | 태그 배열 | string[] |
| date | 글 쓴 날짜 | string |

---

### 글 목록 보기

#### GET /api/article

##### Response

Article의 배열

---

### 글 쓰기

#### POST /api/article

##### Request

| 필드 이름 | 필드 값           | 타입     |
| --------- | ----------------- | -------- |
| title     | 제목              | string   |
| body      | 내용              | string   |
| summary   | 요약              | string   |
| thumbnail | 썸네일 이미지 URL | string   |
| tags      | 태그 배열         | string[] |

---

### 글 수정

#### PATCH /api/article/[Article 아이디]

Request

| 필드 이름 | 필드 값           | 타입     |
| --------- | ----------------- | -------- |
| title     | 제목              | string   |
| body      | 내용              | string   |
| summary   | 요약              | string   |
| thumbnail | 썸네일 이미지 URL | string   |
| tags      | 태그 배열         | string[] |

---

### 글 삭제

#### DELETE /api/article/[Article 아이디]

---

### 이미지 업로드

#### POST /api/image

Content-Type: `multipart/form-data`

Request

| 필드 이름 | 필드 값     |
| --------- | ----------- |
| file      | 파일 데이터 |

Response

| 필드 이름 | 필드 값                    |
| --------- | -------------------------- |
| key       | 이미지의 키값              |
| url       | 업로드된 이미지의 주소 URL |

---

### 이미지 보기

##### GET /api/image/[이미지 Key]

이미지 Key값은 이미지 업로드 때 받았던 `key` 필드 값입니다.
