# 업체 관리 시스템

마사지천국 사이트의 업체 등록 및 관리를 위한 JSON 기반 시스템입니다.

## 📁 파일 구조

```
massage-a/
├── shops.json              # 업체 데이터 저장소
├── shop-manager.js         # 업체 관리 유틸리티 클래스
├── admin.html              # 업체 관리 웹 인터페이스
└── SHOP_MANAGEMENT_README.md
```

## 🚀 사용법

### 1. 업체 등록

`admin.html` 파일을 브라우저에서 열어서 웹 인터페이스를 통해 업체를 등록할 수 있습니다.

**필수 입력 항목:**

- 업체명
- 업체 유형 (한국 마사지, 태국 마사지 등)
- 지역 (서울, 부산 등)
- 구/시
- 주소
- 전화번호
- 최저가

**선택 입력 항목:**

- 상세주소
- 운영시간
- 업체 설명
- 이미지 URL
- 서비스 목록
- 특징
- 태그
- 좌표 (위도, 경도)
- 코스 정보
- 관리사 정보

### 2. JSON 직접 편집

`shops.json` 파일을 직접 편집하여 업체를 추가/수정할 수 있습니다.

#### 업체 데이터 구조

```json
{
  "id": "unique_shop_id",
  "name": "업체명",
  "type": "korean|thai|foot|spa|outcall|waxing",
  "region": "지역명",
  "district": "구/시명",
  "address": "주소",
  "detailAddress": "상세주소",
  "phone": "전화번호",
  "price": "최저가",
  "operatingHours": "운영시간",
  "rating": 4.9,
  "reviewCount": 142,
  "image": "이미지_URL",
  "description": "업체 설명",
  "services": ["서비스1", "서비스2"],
  "courses": [
    {
      "category": "코스 카테고리",
      "items": [
        {
          "name": "코스명",
          "price": "가격",
          "duration": "시간",
          "description": "설명"
        }
      ]
    }
  ],
  "staffInfo": "관리사 정보",
  "reviews": [
    {
      "name": "리뷰어명",
      "rating": 5,
      "date": "2024-09-20",
      "comment": "리뷰 내용"
    }
  ],
  "features": ["특징1", "특징2"],
  "coordinates": {
    "latitude": 33.4996,
    "longitude": 126.5312
  },
  "status": "active|inactive|pending",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-12-19T15:30:00Z",
  "tags": ["태그1", "태그2"]
}
```

### 3. JavaScript API 사용

```javascript
// ShopManager 클래스 사용
const shopManager = new ShopManager();

// 새 업체 추가
const newShop = shopManager.addShop({
  name: '새로운 마사지샵',
  type: 'korean',
  region: '서울',
  district: '강남구',
  address: '서울특별시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  price: '80,000원~',
  // ... 기타 필드
});

// 업체 검색
const results = shopManager.searchShops('강남');

// 지역별 업체 조회
const seoulShops = shopManager.getShopsByRegion('서울');

// 업체 수정
shopManager.updateShop('shop_id', {
  price: '90,000원~',
});

// 업체 삭제 (비활성화)
shopManager.deleteShop('shop_id');
```

## 🔧 주요 기능

### 1. 업체 등록

- 웹 폼을 통한 직관적인 업체 등록
- 실시간 데이터 검증
- 코스 정보 동적 추가/삭제

### 2. 업체 관리

- 업체 목록 조회
- 업체 정보 수정
- 업체 삭제 (비활성화)
- 상태별 필터링

### 3. 검색 및 필터링

- 이름, 주소, 설명, 태그 기반 검색
- 지역별, 구별, 타입별 필터링
- 평점순, 최신순 정렬

### 4. 통계 정보

- 총 업체 수
- 지역별 분포
- 평균 평점
- 리뷰 수 통계

## 📊 데이터 검증

시스템은 다음 항목들을 자동으로 검증합니다:

- **필수 필드**: name, type, region, district, address, phone, price
- **전화번호 형식**: 숫자, 하이픈, 괄호, 공백만 허용
- **평점 범위**: 0-5 사이
- **이메일 형식**: URL 필드의 경우 유효한 URL 형식 검증

## 🚨 주의사항

1. **ID 중복 방지**: 시스템이 자동으로 고유 ID를 생성합니다.
2. **데이터 백업**: 정기적으로 `shops.json` 파일을 백업하세요.
3. **이미지 URL**: 외부 이미지 URL 사용 시 접근 가능한지 확인하세요.
4. **좌표 정보**: 정확한 위도/경도 정보를 입력하세요.

## 🔄 데이터 동기화

현재 시스템은 클라이언트 사이드에서 작동합니다. 실제 운영 환경에서는:

1. 서버 API를 통한 데이터 저장
2. 실시간 동기화
3. 권한 관리 시스템
4. 데이터 백업 및 복구

이 필요합니다.

## 📈 확장 계획

- [ ] 서버 API 연동
- [ ] 이미지 업로드 기능
- [ ] 대량 업체 등록 (CSV/Excel)
- [ ] 업체 승인 워크플로우
- [ ] 리뷰 관리 시스템
- [ ] 통계 대시보드
- [ ] 알림 시스템

## 🆘 문제 해결

### 자주 발생하는 오류

1. **"필수 필드가 누락되었습니다"**

   - 모든 필수 필드를 입력했는지 확인하세요.

2. **"올바른 전화번호 형식이 아닙니다"**

   - 전화번호에 특수문자나 문자를 사용하지 마세요.

3. **"평점은 0-5 사이여야 합니다"**
   - 평점을 0-5 범위 내에서 입력하세요.

### 지원

문제가 발생하면 다음을 확인하세요:

- 브라우저 콘솔의 오류 메시지
- `shops.json` 파일의 JSON 형식
- 필수 필드 입력 여부
