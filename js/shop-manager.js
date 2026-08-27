// 업체 관리 유틸리티
class ShopManager {
  constructor() {
    this.shops = [];
    this.loadShops();
  }

  // JSON 파일에서 업체 데이터 로드
  async loadShops() {
    try {
      const response = await fetch('shops.json');
      const data = await response.json();
      this.shops = data.shops;
      console.log(`${this.shops.length}개 업체 로드 완료`);
    } catch (error) {
      console.error('업체 데이터 로드 실패:', error);
      this.shops = [];
    }
  }

  // 새 업체 추가
  addShop(shopData) {
    const newShop = {
      id: this.generateId(shopData.name, shopData.region),
      ...shopData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: shopData.rating || 0,
      reviewCount: shopData.reviewCount || 0,
    };

    this.shops.push(newShop);
    this.saveShops();
    console.log(`새 업체 추가: ${newShop.name} (ID: ${newShop.id})`);
    return newShop;
  }

  // 업체 정보 수정
  updateShop(shopId, updateData) {
    const index = this.shops.findIndex((shop) => shop.id === shopId);
    if (index === -1) {
      throw new Error(`업체를 찾을 수 없습니다: ${shopId}`);
    }

    this.shops[index] = {
      ...this.shops[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    this.saveShops();
    console.log(`업체 정보 수정: ${this.shops[index].name}`);
    return this.shops[index];
  }

  // 업체 삭제 (상태 변경)
  deleteShop(shopId) {
    const shop = this.shops.find((s) => s.id === shopId);
    if (!shop) {
      throw new Error(`업체를 찾을 수 없습니다: ${shopId}`);
    }

    shop.status = 'inactive';
    shop.updatedAt = new Date().toISOString();
    this.saveShops();
    console.log(`업체 비활성화: ${shop.name}`);
    return shop;
  }

  // 업체 검색
  searchShops(query) {
    const searchTerm = query.toLowerCase();
    return this.shops.filter(
      (shop) =>
        shop.status === 'active' &&
        (shop.name.toLowerCase().includes(searchTerm) ||
          shop.address.toLowerCase().includes(searchTerm) ||
          shop.description.toLowerCase().includes(searchTerm) ||
          shop.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
    );
  }

  // 지역별 업체 조회
  getShopsByRegion(region) {
    return this.shops.filter(
      (shop) => shop.status === 'active' && shop.region === region
    );
  }

  // 구별 업체 조회
  getShopsByDistrict(region, district) {
    return this.shops.filter(
      (shop) =>
        shop.status === 'active' &&
        shop.region === region &&
        shop.district === district
    );
  }

  // 타입별 업체 조회
  getShopsByType(type) {
    return this.shops.filter(
      (shop) => shop.status === 'active' && shop.type === type
    );
  }

  // 평점순 정렬
  getShopsByRating(limit = 10) {
    return this.shops
      .filter((shop) => shop.status === 'active')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // 최근 추가된 업체
  getRecentShops(limit = 5) {
    return this.shops
      .filter((shop) => shop.status === 'active')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  // 통계 정보
  getStatistics() {
    const activeShops = this.shops.filter((shop) => shop.status === 'active');
    const regions = [...new Set(activeShops.map((shop) => shop.region))];
    const types = [...new Set(activeShops.map((shop) => shop.type))];

    const avgRating =
      activeShops.reduce((sum, shop) => sum + shop.rating, 0) /
      activeShops.length;
    const totalReviews = activeShops.reduce(
      (sum, shop) => sum + shop.reviewCount,
      0
    );

    return {
      totalShops: activeShops.length,
      regions: regions.length,
      types: types.length,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews,
      lastUpdated: new Date().toISOString(),
    };
  }

  // ID 생성
  generateId(name, region) {
    const timestamp = Date.now().toString(36);
    const nameCode = name.replace(/\s+/g, '_').toLowerCase();
    const regionCode = region.toLowerCase();
    return `${regionCode}_${nameCode}_${timestamp}`;
  }

  // JSON 파일 저장 (실제 구현에서는 서버 API 호출)
  async saveShops() {
    const data = {
      shops: this.shops,
      metadata: {
        totalShops: this.shops.length,
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        regions: [...new Set(this.shops.map((shop) => shop.region))],
        types: [...new Set(this.shops.map((shop) => shop.type))],
        statusCounts: {
          active: this.shops.filter((shop) => shop.status === 'active').length,
          inactive: this.shops.filter((shop) => shop.status === 'inactive')
            .length,
          pending: this.shops.filter((shop) => shop.status === 'pending')
            .length,
        },
      },
    };

    // 실제 환경에서는 서버에 POST 요청
    console.log('업체 데이터 저장:', data);
    return data;
  }

  // 업체 데이터 검증
  validateShopData(shopData) {
    const required = [
      'name',
      'type',
      'region',
      'district',
      'address',
      'phone',
      'price',
    ];
    const missing = required.filter((field) => !shopData[field]);

    if (missing.length > 0) {
      throw new Error(`필수 필드가 누락되었습니다: ${missing.join(', ')}`);
    }

    // 전화번호 형식 검증
    const phoneRegex = /^[\d-+()\s]+$/;
    if (!phoneRegex.test(shopData.phone)) {
      throw new Error('올바른 전화번호 형식이 아닙니다.');
    }

    // 평점 범위 검증
    if (shopData.rating && (shopData.rating < 0 || shopData.rating > 5)) {
      throw new Error('평점은 0-5 사이여야 합니다.');
    }

    return true;
  }
}

// 사용 예시
const shopManager = new ShopManager();

// 새 업체 추가 예시
function addNewShop() {
  const newShopData = {
    name: '새로운 마사지샵',
    type: 'korean',
    region: '서울',
    district: '강남구',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    price: '80,000원~',
    operatingHours: '10:00 - 22:00',
    description: '새로운 마사지샵입니다.',
    services: ['스웨디시', '아로마'],
    courses: [
      {
        category: '기본 코스',
        items: [
          {
            name: 'A코스',
            price: '80,000원',
            duration: '60분',
            description: '기본 마사지',
          },
        ],
      },
    ],
    features: ['주차 가능', '개인실'],
    coordinates: {
      latitude: 37.5665,
      longitude: 126.978,
    },
    tags: ['강남구', '스웨디시', '아로마'],
  };

  try {
    shopManager.validateShopData(newShopData);
    const addedShop = shopManager.addShop(newShopData);
    console.log('업체 추가 성공:', addedShop);
  } catch (error) {
    console.error('업체 추가 실패:', error.message);
  }
}

// 전역으로 사용할 수 있도록 export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShopManager;
} else {
  window.ShopManager = ShopManager;
}
