// 중앙화된 지역 매핑 데이터 (전역 변수)
// 모든 지역 정보는 여기서만 관리합니다
window.districtMap = {
  jeju: {
    regionName: '제주',
    regionEng: 'jeju',
    districts: {
      si: {
        districtsname: '제주시',
        districtseng: 'jeju-si',
        dongStations: {
          'hallim-eup': '한림읍',
          'aewol-eup': '애월읍',
          'gujwa-eup': '구좌읍',
          'jocheon-eup': '조천읍',
          'hangyeong-myeon': '한경면',
          'chuja-myeon': '추자면',
          'udo-myeon': '우도면',
          'ildo-dong': '일도동',
          'ido-dong': '이도동',
          'samdo-dong': '삼도동',
          'yongdam-dong': '용담동',
          'geonip-dong': '건입동',
          'hwabuk-dong': '화북동',
          'samyang-dong': '삼양동',
          'bonggae-dong': '봉개동',
          'ara-dong': '아라동',
          'ora-dong': '오라동',
          'yeon-dong': '연동',
          'nohyeong-dong': '노형동',
          'oedo-dong': '외도동',
          'iho-dong': '이호동',
          'dodu-dong': '도두동',
        },
      },
      seogwipo: {
        districtsname: '서귀포',
        districtseng: 'jeju-seogwipo',
        dongStations: {
          'daejeong-eup': '대정읍',
          'namwon-eup': '남원읍',
          'seongsan-eup': '성산읍',
          'andeok-myeon': '안덕면',
          'pyoseon-myeon': '표선면',
          'songsan-dong': '송산동',
          'jeongbang-dong': '정방동',
          'jungang-dong': '중앙동',
          'cheonji-dong': '천지동',
          'hyodon-dong': '효돈동',
          'yeongcheon-dong': '영천동',
          'donghong-dong': '동홍동',
          'seohong-dong': '서홍동',
          'daeryun-dong': '대륜동',
          'daecheon-dong': '대천동',
          'jungmun-dong': '중문동',
          'yerae-dong': '예래동',
        },
      },
    },
  },
  ulsan: {
    regionName: '울산',
    regionEng: 'ulsan',
    districts: {
      junggu: {
        districtsname: '중구',
        districtseng: 'ulsan-junggu',
        dongStations: {
          'haksung-dong': '학성동',
          'bangu-dong': '반구동',
          'boksan-dong': '복산동',
          'jungang-dong': '중앙동',
          'ujeong-dong': '우정동',
          'taehwa-dong': '태화동',
          'daun-dong': '다운동',
          'byeongyeong-dong': '병영동',
          'yaksa-dong': '약사동',
          'seongan-dong': '성안동',
        },
      },
      namgu: {
        districtsname: '남구',
        districtseng: 'ulsan-namgu',
        dongStations: {
          'sinjeong-dong': '신정동',
          'dal-dong': '달동',
          'samsan-dong': '삼산동',
          'samho-dong': '삼호동',
          'mugeo-dong': '무거동',
          'ok-dong': '옥동',
          'daehyeon-dong': '대현동',
          'suam-dong': '수암동',
          'seonam-dong': '선암동',
          'yaeumjangsangpo-dong': '야음장생포동',
        },
      },
      donggu: {
        districtsname: '동구',
        districtseng: 'ulsan-donggu',
        dongStations: {
          'ilsan-dong': '일산동',
          'hwajeong-dong': '화정동',
          'daesong-dong': '대송동',
          'jeonha-dong': '전하동',
          'nammok-dong': '남목동',
          'bangeo-dong': '방어동',
        },
      },
      bukgu: {
        districtsname: '북구',
        districtseng: 'ulsan-bukgu',
        dongStations: {
          'nongso-dong': '농소동',
          'gangdong-dong': '강동동',
          'hyomun-dong': '효문동',
          'songjeong-dong': '송정동',
          'yangjeong-dong': '양정동',
          'yeompo-dong': '염포동',
        },
      },
      ulju: {
        districtsname: '울주',
        districtseng: 'ulsan-ulju',
        dongStations: {
          'onsan-eup': '온산읍',
          'eonyang-eup': '언양읍',
          'onyang-eup': '온양읍',
          'beomseo-eup': '범서읍',
          'cheongryang-eup': '청량읍',
          'samnam-eup': '삼남읍',
          'seosaeng-myeon': '서생면',
          'ungchon-myeon': '웅촌면',
          'dudong-myeon': '두동면',
          'duseo-myeon': '두서면',
          'sangbuk-myeon': '상북면',
          'samdong-myeon': '삼동면',
        },
      },
    },
  },
  // 추가 지역들 (필요시 확장)
  seoul: {
    regionName: '서울',
    regionEng: 'seoul',
    districts: {
      gangnam: {
        districtsname: '강남',
        districtseng: 'seoul-gangnam',
        dongStations: {
          'nonhyeon-dong': '논현동',
          'apgujeong-dong': '압구정동',
          'cheongdam-dong': '청담동',
          'daechi-dong': '대치동',
          'yeoksam-dong': '역삼동',
          'dokok-dong': '도곡동',
          'gaepo-dong': '개포동',
          'segyeok-dong': '세곡동',
          'ilwon-dong': '일원동',
          'suseo-dong': '수서동',
          'samseong-dong': '삼성동',
          'gaepo-station': '개포동역',
          'seolleung-station': '선릉역',
          'hagyeoul-station': '학여울역',
          'dokok-station': '도곡역',
          'maebong-station': '매봉역',
          'suseo-station': '수서역',
          'yeoksam-station': '역삼역',
          'bongeunsa-station': '봉은사역',
          'gangnam-station': '강남역',
          'hanti-station': '한티역',
          'samseong-station': '삼성역',
          'daecheong-station': '대청역',
          'apgujeong-station': '압구정역',
          'nonhyeon-station': '논현역',
          'seonjeongneung-station': '선정릉역',
          'eonju-station': '언주역',
          'daechi-station': '대치역',
          'sinsa-station': '신사역',
          'ilwon-station': '일원역',
          'sinnonhyeon-station': '신논현역',
          'hakdong-station': '학동역',
          'gangnam-gu-office-station': '강남구청역',
          'daemosan-station': '대모산입구역',
          'guryong-station': '구룡역',
          'samseongjungang-station': '삼성중앙역',
          'apgujeongrodeo-station': '압구정로데오역',
        },
      },
      gangdong: {
        districtsname: '강동',
        districtseng: 'seoul-gangdong',
        dongStations: {
          'gangil-dong': '강일동',
          'sangil-dong': '상일동',
          'myeongil-dong': '명일동',
          'godeok-dong': '고덕동',
          'amsa-dong': '암사동',
          'cheonho-dong': '천호동',
          'seongnae-dong': '성내동',
          'gildong-dong': '길동',
          'dunchon-dong': '둔촌동',
          'sangil-station': '상일동역',
          'cheonho-station': '천호역',
          'godeok-station': '고덕역',
          'gildong-station': '길동역',
          'amsa-station': '암사역',
          'myeongil-station': '명일역',
          'gangdong-station': '강동역',
          'gangdong-gu-office-station': '강동구청역',
          'dunchon-station': '둔촌동역',
          'dunchon-oryun-station': '둔촌오륜역',
          'gungpyeong-station': '굽은다리역',
          'central-veterans-hospital-station': '중앙보훈병원역',
        },
      },
      gangbuk: {
        districtsname: '강북',
        districtseng: 'seoul-gangbuk',
        dongStations: {
          'samyang-dong': '삼양동',
          'miari-dong': '미아동',
          'songjung-dong': '송중동',
          'songcheon-dong': '송천동',
          'samgaksan-dong': '삼각산동',
          'beon-dong': '번동',
          'suyu-dong': '수유동',
          'ui-dong': '우이동',
          'insu-dong': '인수동',
          'mia-station': '미아역',
          'suyu-station': '수유역',
          'mia-samgeori-station': '미아사거리역',
          'hwagye-station': '화계역',
          'gaori-station': '가오리역',
          'solsaem-station': '솔샘역',
          'samyang-samgeori-station': '삼양사거리역',
          '419-station': '4.19.민주묘지역',
          'solbat-park-station': '솔밭공원역',
          'bukhansan-ui-station': '북한산우이역',
          'samyang-station': '삼양역',
        },
      },
      gangseo: {
        districtsname: '강서',
        districtseng: 'seoul-gangseo',
        dongStations: {
          'yeomchang-dong': '염창동',
          'deungchon-dong': '등촌동',
          'hwagok-dong': '화곡동',
          'hwagokbon-dong': '화곡본동',
          'gayang-dong': '가양동',
          'balsan-dong': '발산동',
          'ujangsan-dong': '우장산동',
          'gonghang-dong': '공항동',
          'banghwa-dong': '방화동',
          'hwagok-station': '화곡역',
          'gaehwasan-station': '개화산역',
          'yeomchang-station': '염창역',
          'deungchon-station': '등촌역',
          'ujangsan-station': '우장산역',
          'songjeong-station': '송정역',
          'gimpo-airport-station': '김포공항역',
          'airport-market-station': '공항시장역',
          'magok-station': '마곡역',
          'magoknaru-station': '마곡나루역',
          'gayang-station': '가양역',
          'banghwa-station': '방화역',
          'gachisan-station': '까치산역',
          'jungsin-station': '증미역',
          'sinbanghwa-station': '신방화역',
          'balsan-station': '발산역',
        },
      },
      gwanak: {
        districtsname: '관악',
        districtseng: 'seoul-gwanak',
        dongStations: {
          'boramae-dong': '보라매동',
          'cheongnim-dong': '청림동',
          'seonghyeon-dong': '성현동',
          'haengun-dong': '행운동',
          'nakseongdae-dong': '낙성대동',
          'cheongryong-dong': '청룡동',
          'euncheon-dong': '은천동',
          'jungang-dong': '중앙동',
          'inheon-dong': '인헌동',
          'namhyeon-dong': '남현동',
          'seowon-dong': '서원동',
          'sinwon-dong': '신원동',
          'seorim-dong': '서림동',
          'sinlim-dong': '신림동',
          'nanhyang-dong': '난향동',
          'jowon-dong': '조원동',
          'daehak-dong': '대학동',
          'miseong-dong': '미성동',
          'nangok-dong': '난곡동',
          'samseong-dong': '삼성동',
          'sinlim-station': '신림역',
          'snu-station': '서울대입구역',
          'nakseongdae-station': '낙성대역',
          'bongcheon-station': '봉천역',
        },
      },
      gwangjin: {
        districtsname: '광진',
        districtseng: 'seoul-gwangjin',
        dongStations: {
          'hwayang-dong': '화양동',
          'gunja-dong': '군자동',
          'junggok-dong': '중곡동',
          'neung-dong': '능동',
          'gwangjang-dong': '광장동',
          'jayang-dong': '자양동',
          'gujung-dong': '구의동',
          'gunja-station': '군자역',
          'konkuk-station': '건대입구역',
          'gujung-station': '구의역',
          'achasan-station': '아차산역',
          'children-park-station': '어린이대공원역',
          'gwangnaru-station': '광나루역',
          'gangbyeon-station': '강변역',
          'junggok-station': '중곡역',
          'ddukseom-yu-wonji-station': '뚝섬유원지역',
        },
      },
      guro: {
        districtsname: '구로',
        districtseng: 'seoul-guro',
        dongStations: {
          'sindorim-dong': '신도림동',
          'guro-dong': '구로동',
          'garibong-dong': '가리봉동',
          'gocheok-dong': '고척동',
          'gaebong-dong': '개봉동',
          'oryu-dong': '오류동',
          'sugung-dong': '수궁동',
          'hang-dong': '항동',
          'guro-station': '구로역',
          'onsu-station': '온수역',
          'sindorim-station': '신도림역',
          'oryu-station': '오류동역',
          'guro-digital-station': '구로디지털단지역',
          'gaebong-station': '개봉역',
          'cheonwang-station': '천왕역',
          'dorimcheon-station': '도림천역',
          'namguro-station': '남구로역',
          'guil-station': '구일역',
          'daerim-station': '대림역',
        },
      },
      geumcheon: {
        districtsname: '금천',
        districtseng: 'seoul-geumcheon',
        dongStations: {
          'gasan-dong': '가산동',
          'doksan-dong': '독산동',
          'siheung-dong': '시흥동',
          'doksan-station': '독산역',
          'geumcheon-gu-office-station': '금천구청역',
          'gasan-digital-station': '가산디지털단지역',
        },
      },
      nowon: {
        districtsname: '노원',
        districtseng: 'seoul-nowon',
        dongStations: {
          'wolgok-dong': '월계동',
          'gongneung-dong': '공릉동',
          'hagye-dong': '하계동',
          'junggyebon-dong': '중계본동',
          'junggye-dong': '중계동',
          'sanggye-dong': '상계동',
          'nowon-station': '노원역',
          'suraksan-station': '수락산역',
          'junggye-station': '중계역',
          'madeul-station': '마들역',
          'sanggye-station': '상계역',
          'hagye-station': '하계역',
          'gongneung-station': '공릉역',
          'danggogae-station': '당고개역',
          'taereung-station': '태릉입구역',
          'wolgok-station': '월계역',
          'hwarangdae-station': '화랑대역',
          'gwangun-station': '광운대역',
          'seokgye-station': '석계역',
        },
      },
      dobong: {
        districtsname: '도봉',
        districtseng: 'seoul-dobong',
        dongStations: {
          'chang-dong': '창동',
          'dobong-dong': '도봉동',
          'ssangmun-dong': '쌍문동',
          'banghak-dong': '방학동',
          'dobong-station': '도봉역',
          'changdong-station': '창동역',
          'ssangmun-station': '쌍문역',
          'banghak-station': '방학역',
          'dobongsan-station': '도봉산역',
          'nokcheon-station': '녹천역',
        },
      },
      dongdaemun: {
        districtsname: '동대문',
        districtseng: 'seoul-dongdaemun',
        dongStations: {
          'yongsin-dong': '용신동',
          'jegi-dong': '제기동',
          'jeonnong-dong': '전농동',
          'dapsimni-dong': '답십리동',
          'jangan-dong': '장안동',
          'cheongnyangni-dong': '청량리동',
          'hoegi-dong': '회기동',
          'hwihyeong-dong': '휘경동',
          'imun-dong': '이문동',
          'hoegi-station': '회기역',
          'cheongnyangni-station': '청량리역',
          'jegi-station': '제기동역',
          'janghanpyeong-station': '장한평역',
          'oie-station': '외대앞역',
          'sinsuldong-station': '신설동역',
          'sineimun-station': '신이문역',
        },
      },
      dongjak: {
        districtsname: '동작',
        districtseng: 'seoul-dongjak',
        dongStations: {
          'noryangjin-dong': '노량진동',
          'sangdo-dong': '상도동',
          'heukseok-dong': '흑석동',
          'sadang-dong': '사당동',
          'daebang-dong': '대방동',
          'sindaebang-dong': '신대방동',
          'isu-station': '이수역',
          'sadang-station': '사당역',
          'sangdo-station': '상도역',
          'sindaebang-station': '신대방역',
          'sindaebang-samgeori-station': '신대방삼거리역',
          'heukseok-station': '흑석(중앙대입구)역',
          'noryangjin-station': '노량진역',
          'jangseungbaegi-station': '장승배기역',
          'dongjak-station': '동작역',
          'chongsin-station': '총신대입구역',
          'namseong-station': '남성역',
          'nodeul-station': '노들역',
          'soongsil-station': '숭실대입구역',
        },
      },
      mapo: {
        districtsname: '마포',
        districtseng: 'seoul-mapo',
        dongStations: {
          'ahyeon-dong': '아현동',
          'gongdeok-dong': '공덕동',
          'dohwa-dong': '도화동',
          'yonggang-dong': '용강동',
          'daeheung-dong': '대흥동',
          'yeomni-dong': '염리동',
          'sinsu-dong': '신수동',
          'seogang-dong': '서강동',
          'seogyo-dong': '서교동',
          'hapjeong-dong': '합정동',
          'mangwon-dong': '망원동',
          'yeonnam-dong': '연남동',
          'seongsan-dong': '성산동',
          'sangam-dong': '상암동',
          'donggyo-dong': '동교동',
          'gongdeok-airport-station': '공덕(공항철도)역',
          'sinchon-station': '신촌역',
          'aeogae-station': '애오개역',
          'hapjeong-station': '합정역',
          'seogang-station': '서강대역',
          'worldcup-station': '월드컵경기장역',
          'dmd-airport-station': '디지털미디어시티(공항철도)역',
          'daeheung-station': '대흥역',
          'mapo-gu-office-station': '마포구청역',
          'sangsu-station': '상수역',
          'mapo-station': '마포역',
          'hongik-station': '홍대입구역',
          'gongdeok-station': '공덕역',
          'ahyeon-station': '아현역',
          'idaegae-station': '이대역',
        },
      },
      seodaemun: {
        districtsname: '서대문',
        districtseng: 'seoul-seodaemun',
        dongStations: {
          'cheonyeon-dong': '천연동',
          'bugahyeon-dong': '북아현동',
          'chunghyeon-dong': '충현동',
          'sinchon-dong': '신촌동',
          'yeonhui-dong': '연희동',
          'hongje-dong': '홍제동',
          'hongeun-dong': '홍은동',
          'namgajwa-dong': '남가좌동',
          'buggajwa-dong': '북가좌동',
          'hongje-station': '홍제역',
          'chungjeongno-station': '충정로역',
          'muakjae-station': '무악재역',
          'sinchon-station': '신촌역',
          'doknipmun-station': '독립문역',
          'gajwa-station': '가좌역',
        },
      },
      seocho: {
        districtsname: '서초',
        districtseng: 'seoul-seocho',
        dongStations: {
          'seocho-dong': '서초동',
          'jamwon-dong': '잠원동',
          'banpobon-dong': '반포본동',
          'banpo-dong': '반포동',
          'bangbaebon-dong': '방배본동',
          'bangbae-dong': '방배동',
          'yangjae-dong': '양재동',
          'naegok-dong': '내곡동',
          'namtaeryeong-station': '남태령역',
          'sapyeong-station': '사평역',
          'express-terminal-station': '고속터미널역',
          'bangbae-station': '방배역',
          'gubanpo-station': '구반포역',
          'yangjae-station': '양재역',
          'seocho-station': '서초역',
          'naebang-station': '내방역',
          'jamwon-station': '잠원역',
          'cheonggyesan-station': '청계산입구역',
          'yangjae-forest-station': '양재시민의숲역',
          'sinbanpo-station': '신반포역',
          'banpo-station': '반포역',
          'nambu-terminal-station': '남부터미널역',
          'gyodae-station': '교대역',
        },
      },
      seongdong: {
        districtsname: '성동구',
        districtseng: 'seoul-seongdong',
        dongStations: {
          'wangsimni-dong': '왕십리동',
          'doseon-dong': '도선동',
          'majang-dong': '마장동',
          'sageun-dong': '사근동',
          'haengdang-dong': '행당동',
          'eungbong-dong': '응봉동',
          'geumho-dong': '금호동',
          'oksu-dong': '옥수동',
          'seongsu-dong': '성수동',
          'songjeong-dong': '송정동',
          'yongdap-dong': '용답동',
          'oksu-station': '옥수역',
          'majang-station': '마장역',
          'hangyang-station': '한양대역',
          'seoul-forest-station': '서울숲역',
          'haengdang-station': '행당역',
          'eungbong-station': '응봉역',
          'geumho-station': '금호역',
          'seongsu-station': '성수역',
          'sindap-station': '신답역',
          'yongdap-station': '용답역',
          'sanggeumho-station': '신금호역',
          'dapsimni-station': '답십리역',
          'sangwangsimni-station': '상왕십리역',
          'wangsimni-station': '왕십리역',
        },
      },
      seongbuk: {
        districtsname: '성북',
        districtseng: 'seoul-seongbuk',
        dongStations: {
          'seongbuk-dong': '성북동',
          'samseon-dong': '삼선동',
          'dongseon-dong': '동선동',
          'donam-dong': '돈암동',
          'ansan-dong': '안암동',
          'bomun-dong': '보문동',
          'jeongneung-dong': '정릉동',
          'gireum-dong': '길음동',
          'jongam-dong': '종암동',
          'wolgok-dong': '월곡동',
          'jangwi-dong': '장위동',
          'seokgwan-dong': '석관동',
          'korea-univ-station': '고려대역',
          'ansan-station': '안암역',
          'bomun-station': '보문역',
          'seongsin-station': '성신여대입구역',
          'gireum-station': '길음역',
          'dologgoi-station': '돌곶이역',
          'hansung-univ-station': '한성대입구역',
          'jeongneung-station': '정릉역',
          'wolgok-station': '월곡역',
          'sangwolgok-station': '상월곡역',
          'bukhan-bogukmun-station': '북한산보국문역',
        },
      },
      songpa: {
        districtsname: '송파',
        districtseng: 'seoul-songpa',
        dongStations: {
          'pungnap-dong': '풍납동',
          'geoyeo-dong': '거여동',
          'macheon-dong': '마천동',
          'bang-i-dong': '방이동',
          'oryun-dong': '오륜동',
          'ogeum-dong': '오금동',
          'songpa-dong': '송파동',
          'seokchon-dong': '석촌동',
          'samjeon-dong': '삼전동',
          'garakbon-dong': '가락본동',
          'garak-dong': '가락동',
          'munjeong-dong': '문정동',
          'jangji-dong': '장지동',
          'wiryese-dong': '위례동',
          'jamsilbon-dong': '잠실본동',
          'jamsil-dong': '잠실동',
          'bang-i-station': '방이역',
          'police-hospital-station': '경찰병원역',
          'garak-market-station': '가락시장역',
          'sadang-station': '사당역',
          'ogeum-station': '오금역',
          'sports-complex-station': '종합운동장역',
          'geoyeo-station': '거여역',
          'macheon-station': '마천역',
          'olympic-park-station': '올림픽공원역',
          'songpa-station': '송파역',
          'jamsil-station': '잠실역',
          'mongchontoseong-station': '몽촌토성역',
          'seokchon-station': '석촌역',
          'samjeon-station': '삼전역',
          'seokchon-tomb-station': '석촌고분역',
          'songpanaru-station': '송파나루역',
          'hansung-baekje-station': '한성백제역',
          'jangji-station': '장지역',
          'gae-rong-station': '개롱역',
          'munjeong-station': '문정역',
        },
      },
      yangcheon: {
        districtsname: '양천',
        districtseng: 'seoul-yangcheon',
        dongStations: {
          'mok-dong': '목동',
          'sinwol-dong': '신월동',
          'sinjeong-dong': '신정동',
          'omokgyo-station': '오목교역',
          'sinjeong-station': '신정역',
          'mok-station': '목동역',
          'sinjeong-negeori-station': '신정네거리역',
          'yangcheon-gu-office-station': '양천구청역',
          'sinmok-station': '신목동역',
        },
      },
      yeongdeungpo: {
        districtsname: '영등포',
        districtseng: 'seoul-yeongdeungpo',
        dongStations: {
          'yeongdeungpobon-dong': '영등포본동',
          'yeongdeungpo-dong': '영등포동',
          'yeoui-dong': '여의동',
          'dangsan-dong': '당산동',
          'dorim-dong': '도림동',
          'mullae-dong': '문래동',
          'yangpyeong-dong': '양평동',
          'singil-dong': '신길동',
          'daerim-dong': '대림동',
          'yeongdeungpo-gu-office-station': '영등포구청역',
          'yeouido-station': '여의도역',
          'boramae-station': '보라매역',
          'sinyeonsu-station': '신풍역',
          'yeongdeungpo-market-station': '영등포시장역',
          'singil-station': '신길역',
          'dangsan-station': '당산역',
          'mullae-station': '문래역',
          'yangpyeong-station': '양평역',
          'yeongdeungpo-station': '영등포역',
          'gukheui-station': '국회의사당역',
          'yeouinaru-station': '여의나루역',
          'daerim-station': '대림동',
          'seonyugo-station': '선유도역',
          'saetgang-station': '샛강역',
          'daebang-station': '대방역',
        },
      },
      yongsan: {
        districtsname: '용산',
        districtseng: 'seoul-yongsan',
        dongStations: {
          'huam-dong': '후암동',
          'yongsan-dong': '용산동',
          'namyeong-dong': '남영동',
          'cheongpa-dong': '청파동',
          'wonhyoro-dong': '원효로동',
          'hyochang-dong': '효창동',
          'yongmun-dong': '용문동',
          'hangangro-dong': '한강로동',
          'ichon-dong': '이촌동',
          'itawon-dong': '이태원동',
          'hannam-dong': '한남동',
          'seobinggo-dong': '서빙고동',
          'bogwang-dong': '보광동',
          'namyeong-station': '남영역',
          'hyochang-park-station': '효창공원앞역',
          'itawon-station': '이태원역',
          'sinyongsan-station': '신용산역',
          'noksapyeong-station': '녹사평역',
          'hannam-station': '한남역',
          'seoul-airport-rail-station': '서울역(공항철도)역',
          'yongsan-station': '용산역',
          'seoul-station': '서울역',
          'hangangjin-station': '한강진역',
          'samgakji-station': '삼각지역',
          'ichon-station': '이촌역',
          'seobinggo-station': '서빙고역',
          'sukmyeong-station': '숙대입구역',
        },
      },
      eunpyeong: {
        districtsname: '은평',
        districtseng: 'seoul-eunpyeong',
        dongStations: {
          'nokbeon-dong': '녹번동',
          'bulgwang-dong': '불광동',
          'galhyeon-dong': '갈현동',
          'gusan-dong': '구산동',
          'daejo-dong': '대조동',
          'eungam-dong': '응암동',
          'yeokchon-dong': '역촌동',
          'sinsa-dong': '신사동',
          'jeungsan-dong': '증산동',
          'susaek-dong': '수색동',
          'jingwan-dong': '진관동',
          'saejeol-station': '새절역',
          'jeungsan-station': '증산역',
          'bulgwang-station': '불광역',
          'gupabal-station': '구파발역',
          'yeonsinnae-station': '연신내역',
          'dmd-station': '디지털미디어시티역',
          'susaek-station': '수색역',
          'eungam-station': '응암역',
          'yeokchon-station': '역촌역',
          'nokbeon-station': '녹번역',
          'gusan-station': '구산역',
          'dokbawi-station': '독바위역',
        },
      },
      jongno: {
        districtsname: '종로',
        districtseng: 'seoul-jongno',
        dongStations: {
          'cheongunhyoja-dong': '청운효자동',
          'sajik-dong': '사직동',
          'samcheong-dong': '삼청동',
          'buam-dong': '부암동',
          'pyeongchang-dong': '평창동',
          'muak-dong': '무악동',
          'gyonam-dong': '교남동',
          'gahoe-dong': '가회동',
          'jongno-dong': '종로동',
          'ihwa-dong': '이화동',
          'hyehwa-dong': '혜화동',
          'changsin-dong': '창신동',
          'sungin-dong': '숭인동',
          'jongno-5ga-station': '종로5가역',
          'jonggak-station': '종각역',
          'jongno-3ga-station': '종로3가역',
          'anguk-station': '안국역',
          'hyehwa-station': '혜화역',
          'seodaemun-station': '서대문역',
          'dongmyo-station': '동묘앞역',
          'changsin-station': '창신역',
          'gwanghwamun-station': '광화문역',
          'gyeongbokgung-station': '경복궁역',
          'dongdae-station': '동대문역',
        },
      },
      junggu: {
        districtsname: '중구',
        districtseng: 'seoul-junggu',
        dongStations: {
          'sogong-dong': '소공동',
          'hoehyeon-dong': '회현동',
          'myeong-dong': '명동',
          'pil-dong': '필동',
          'jangchung-dong': '장충동',
          'gwanghui-dong': '광희동',
          'euljiro-dong': '을지로',
          'sindang-dong': '신당동',
          'dasan-dong': '다산동',
          'yaksu-dong': '약수동',
          'cheonggu-dong': '청구동',
          'donghwa-dong': '동화동',
          'hwanghak-dong': '황학동',
          'jungnim-dong': '중림동',
          'ddmh-station': '동대문역사문화공원역',
          'yaksu-station': '약수역',
          'city-hall-station': '시청역',
          'euljiro-station': '을지로입구역',
          'myeongdong-station': '명동역',
          'chungmuro-station': '충무로역',
          'cheonggu-station': '청구역',
          'sindang-station': '신당역',
          'hoehyeon-station': '회현역',
          'euljiro-3ga-station': '을지로3가역',
          'euljiro-4ga-station': '을지로4가역',
          'yaksu-station': '약수역',
          'butigo-station': '버티고개역',
          'dongdae-station': '동대입구역',
          'seoul-gyeonguiseon-station': '서울(경의선)역',
        },
      },
      jungnang: {
        districtsname: '중랑구',
        districtseng: 'seoul-jungnang',
        dongStations: {
          'mangu-dong': '면목동',
          'mangubon-dong': '면목본동',
          'sangbong-dong': '상봉동',
          'junghwa-dong': '중화동',
          'muk-dong': '묵동',
          'mangubon-dong2': '망우본동',
          'mangu-dong2': '망우동',
          'sinae-dong': '신내동',
          'mangu-station': '망우역',
          'sangbong-station': '상봉역',
          'jungnang-station': '중랑역',
          'yangwon-station': '양원역',
          'mangu2-station': '면목역',
          'sagajeong-station': '사가정역',
          'yongmasan-station': '용마산역',
          'bonghwasan-station': '봉화산역',
          'sinae-station': '신내역',
          'junghwa-station': '중화역',
          'mukgol-station': '먹골역',
        },
      },
    },
  },
  busan: {
    regionName: '부산',
    regionEng: 'busan',
    districts: {
      junggu: {
        districtsname: '중구',
        districtseng: 'busan-junggu',
        dongStations: {
          'jungang-dong': '중앙동',
          'donggwang-dong': '동광동',
          'daecheong-dong': '대청동',
          'bosu-dong': '보수동',
          'bupyeong-dong': '부평동',
          'gwangbok-dong': '광복동',
          'nampo-dong': '남포동',
          'yeongju-dong': '영주동',
          'jungang-station': '중앙역',
          'nampo-station': '남포역',
          'jagalchi-station': '자갈치역',
        },
      },
      seogu: {
        districtsname: '서구',
        districtseng: 'busan-seogu',
        dongStations: {
          'dongdaesin-dong': '동대신동',
          'seodaesin-dong': '서대신동',
          'bumin-dong': '부민동',
          'ami-dong': '아미동',
          'chojang-dong': '초장동',
          'chungmu-dong': '충무동',
          'nambumin-dong': '남부민동',
          'amnam-dong': '암남동',
          'toseong-station': '토성역',
          'seodaesin-station': '서대신역',
          'dongdaesin-station': '동대신역',
        },
      },
      donggu: {
        districtsname: '동구',
        districtseng: 'busan-donggu',
        dongStations: {
          'choryang-dong': '초량동',
          'sujeong-dong': '수정동',
          'jwachon-dong': '좌천동',
          'beomil-dong': '범일동',
          'choryang-station': '초량역',
          'busan-station': '부산역',
          'busanjin-station': '부산진역',
          'jwachon-station': '좌천역',
          'beomil-station': '범일역',
        },
      },
      yeongdo: {
        districtsname: '영도',
        districtseng: 'busan-yeongdo',
        dongStations: {
          'namhang-dong': '남항동',
          'yeongseon-dong': '영선동',
          'sinseon-dong': '신선동',
          'bongrae-dong': '봉래동',
          'cheonghak-dong': '청학동',
          'dongsam-dong': '동삼동',
        },
      },
      busanjin: {
        districtsname: '부산진',
        districtseng: 'busan-busanjin',
        dongStations: {
          'bujeon-dong': '부전동',
          'yeonji-dong': '연지동',
          'cho-eup-dong': '초읍동',
          'yangjeong-dong': '양정동',
          'jeonpo-dong': '전포동',
          'buam-dong': '부암동',
          'danggamje-dong': '당감제동',
          'danggam-dong': '당감동',
          'gayaje-dong': '가야제동',
          'gaya-dong': '가야동',
          'gaegeum-dong': '개금동',
          'beomcheon-dong': '범천동',
          'seomyeon-dong': '서면동',
          'yangjeong-station': '양정역',
          'jeonpo-station': '전포역',
          'bujeon-station': '부전역',
          'gaegeum-station': '개금역',
          'gaya-station': '가야역',
          'seomyeon-station': '서면역',
          'buam-station': '부암역',
          'dongui-station': '동의대역',
          'beomnaegol-station': '범내골역',
        },
      },
      dongnae: {
        districtsname: '동래',
        districtseng: 'busan-dongnae',
        dongStations: {
          'sumin-dong': '수민동',
          'boksan-dong': '복산동',
          'myeongnyun-dong': '명륜동',
          'oncheon-dong': '온천동',
          'sajeong-dong': '사직동',
          'allak-dong': '안락동',
          'myeongjang-dong': '명장동',
          'myeongnyun-station': '명륜역',
          'oncheonjang-station': '온천장역',
          'sajeong-station': '사직역',
          'dongnae-station': '동래역',
          'suan-station': '수안역',
          'minam-station': '미남역',
          'nakmin-station': '낙민역',
          'chungryeolsa-station': '충렬사역',
          'allak-station': '안락역',
          'myeongjang-station': '명장역',
        },
      },
      namgu: {
        districtsname: '남구',
        districtseng: 'busan-namgu',
        dongStations: {
          'daeyeon-dong': '대연동',
          'yongho-dong': '용호동',
          'yongdang-dong': '용당동',
          'gamman-dong': '감만동',
          'uam-dong': '우암동',
          'munhyeon-dong': '문현동',
          'daeyeon-station': '대연역',
          'motgol-station': '못골역',
          'munhyeon-station': '문현역',
          'jigegol-station': '지게골역',
          'gyeongseongbukyeongdae-station': '경성부경대역',
        },
      },
      bukgu: {
        districtsname: '북구',
        districtseng: 'busan-bukgu',
        dongStations: {
          'gupo-dong': '구포동',
          'geumgok-dong': '금곡동',
          'hwaam-dong': '화명동',
          'deokcheon-dong': '덕천동',
          'mandeok-dong': '만덕동',
          'gupo-station': '구포역',
          'deokcheon-station': '덕천역',
          'hwaam-station': '화명역',
          'geumgok-station': '금곡역',
          'gumyeong-station': '구명역',
          'sujeong-station': '수정역',
          'sukdeung-station': '숙등역',
          'yulli-station': '율리역',
          'gunam-station': '구남역',
          'mandeok-station': '만덕역',
          'namsanjeong-station': '남산정역',
          'dongwon-station': '동원역',
        },
      },
      haeundae: {
        districtsname: '해운대',
        districtseng: 'busan-haeundae',
        dongStations: {
          'u-dong': '우동',
          'jung-dong': '중동',
          'jwa-dong': '좌동',
          'seongjeong-dong': '송정동',
          'banyeo-dong': '반여동',
          'bansong-dong': '반송동',
          'jaesong-dong': '재송동',
          'jaesong-station': '재송역',
          'seokdae-station': '석대역',
          'bexco-station': '벡스코역',
          'banyeonongmul-station': '반여농산물시장역',
          'centum-station': '센텀역',
          'dongbaek-station': '동백역',
          'seongjeong-station': '송정역',
          'haeundae-station': '해운대역',
          'jangsan-station': '장산역',
          'centumcity-station': '센텀시티역',
          'dongbusandae-station': '동부산대학역',
          'jungdong-station': '중동역',
          'yeongsandae-station': '영산대역',
          'sinhaeundae-station': '신해운대역',
        },
      },
      saha: {
        districtsname: '사하',
        districtseng: 'busan-saha',
        dongStations: {
          'goejeong-dong': '괴정동',
          'dangni-dong': '당리동',
          'hadan-dong': '하단동',
          'sinpyeong-dong': '신평동',
          'jangnim-dong': '장림동',
          'dadae-dong': '다대동',
          'gupyeong-dong': '구평동',
          'gamcheon-dong': '감천동',
          'sinjangnim-station': '신장림역',
          'dangni-station': '당리역',
          'hadan-station': '하단역',
          'dongmae-station': '동매역',
          'saha-station': '사하역',
          'jangnim-station': '장림역',
          'sinpyeong-station': '신평역',
          'dadaepohang-station': '다대포항역',
          'dadaepohae-station': '다대포해수욕장역',
          'natgae-station': '낫개역',
          'goejeong-station': '괴정역',
          'daeti-station': '대티역',
        },
      },
      geumjeong: {
        districtsname: '금정',
        districtseng: 'busan-geumjeong',
        dongStations: {
          'seo-dong': '서동',
          'geumsahaedong-dong': '금사회동동',
          'bugok-dong': '부곡동',
          'jangjeon-dong': '장전동',
          'seondugu-dong': '선두구동',
          'cheongryongnopo-dong': '청룡노포동',
          'namsan-dong': '남산동',
          'guseo-dong': '구서동',
          'geumseong-dong': '금성동',
          'beomeosa-station': '범어사역',
          'dusil-station': '두실역',
          'jangjeon-station': '장전역',
          'seodong-station': '서동역',
          'geumsa-station': '금사역',
          'guseo-station': '구서역',
          'namsan-station': '남산역',
          'busan-station': '부산대역',
          'nopo-station': '노포역',
        },
      },
      gangseo: {
        districtsname: '강서',
        districtseng: 'busan-gangseo',
        dongStations: {
          'daejeo-dong': '대저동',
          'gangdong-dong': '강동동',
          'myeongji-dong': '명지동',
          'garak-dong': '가락동',
          'noksan-dong': '녹산동',
          'gadeokdo-dong': '가덕도동',
          'daejeo-station': '대저역',
          'deokdu-station': '덕두역',
          'gonghang-station': '공항역',
          'daesa-station': '대사역',
          'pyunggang-station': '평강역',
          'gangseo-gu-office-station': '강서구청역',
          'deunggu-station': '등구역',
          'seobusan-station': '서부산유통지구역',
          'cheyuk-station': '체육공원역',
        },
      },
      yeonje: {
        districtsname: '연제',
        districtseng: 'busan-yeonje',
        dongStations: {
          'geoje-dong': '거제동',
          'yeonsan-dong': '연산동',
          'yeonsan-station': '연산역',
          'mulmangol-station': '물만골역',
          'gyodae-station': '교대역',
          'sports-complex-station': '종합운동장역',
          'geoje-station': '거제역',
          'geojehaemaji-station': '거제해맞이역',
          'sicheong-station': '시청역',
        },
      },
      suyeong: {
        districtsname: '수영',
        districtseng: 'busan-suyeong',
        dongStations: {
          'namcheon-dong': '남천동',
          'suyeong-dong': '수영동',
          'mangmi-dong': '망미동',
          'gwangan-dong': '광안동',
          'millak-dong': '민락동',
          'geumnyeonsan-station': '금련산역',
          'mangmi-station': '망미역',
          'suyeong-station': '수영역',
          'gwangan-station': '광안역',
          'namcheon-station': '남천역',
          'millak-station': '민락역',
        },
      },
      sasang: {
        districtsname: '사상',
        districtseng: 'busan-sasang',
        dongStations: {
          'samnak-dong': '삼락동',
          'mora-dong': '모라동',
          'deokpo-dong': '덕포동',
          'gwaebeop-dong': '괘법동',
          'gamjeon-dong': '감전동',
          'jurye-dong': '주례동',
          'hakjang-dong': '학장동',
          'eomgung-dong': '엄궁동',
          'deokpo-station': '덕포역',
          'gamjeon-station': '감전역',
          'modok-station': '모덕역',
          'gwabeop-station': '괘법르네시떼역',
          'jurye-station': '주례역',
          'naengjeong-station': '냉정역',
          'sasang-station': '사상역',
          'mora-station': '모라역',
        },
      },
      gijang: {
        districtsname: '기장',
        districtseng: 'busan-gijang',
        dongStations: {
          'gijang-eup': '기장읍',
          'jangan-eup': '장안읍',
          'jeonggwan-eup': '정관읍',
          'ilgwang-eup': '일광읍',
          'cheolma-myeon': '철마면',
          'gijang-station': '기장역',
          'anpyeong-station': '안평역',
          'ilgwang-station': '일광역',
          'gochon-station': '고촌역',
          'osiria-station': '오시리아역',
        },
      },
    },
  },
  daegu: {
    regionName: '대구',
    regionEng: 'daegu',
    districts: {
      junggu: {
        districtsname: '중구',
        districtseng: 'daegu-junggu',
        dongStations: {
          'dongin-dong': '동인동',
          'samdeok-dong': '삼덕동',
          'seongnae-dong': '성내동',
          'daesin-dong': '대신동',
          'namsan-dong': '남산동',
          'daebong-dong': '대봉동',
          'jungangno-station': '중앙로역',
          'dalseong-park-station': '달성공원역',
          'sinam-station': '신남역',
          'namsan-station': '남산역',
          'seomun-market-station': '서문시장역',
          'banwoldang-station': '반월당역',
          'myeongdeok-station': '명덕역',
        },
      },
      donggu: {
        districtsname: '동구',
        districtseng: 'daegu-donggu',
        dongStations: {
          'sinam-dong': '신암동',
          'sincheon-dong': '신천동',
          'hyomok-dong': '효목동',
          'dopyeong-dong': '도평동',
          'bullobongmu-dong': '불로봉무동',
          'jijeo-dong': '지저동',
          'dongchon-dong': '동촌동',
          'bangchon-dong': '방촌동',
          'haean-dong': '해안동',
          'ansim-dong': '안심동',
          'hyeoksin-dong': '혁신동',
          'gongsan-dong': '공산동',
          'ayanggyo-station': '아양교역',
          'banyawol-station': '반야월역',
          'yonggye-station': '용계역',
          'dongchon-station': '동촌역',
          'sincheon-station': '신천역',
          'keungogae-station': '큰고개역',
          'singi-station': '신기역',
          'dongdaegu-station': '동대구역',
          'bangchon-station': '방촌역',
          'ansim-station': '안심역',
          'haean-station': '해안역',
          'gaksan-station': '각산역',
          'yulha-station': '율하역',
        },
      },
      seogu: {
        districtsname: '서구',
        districtseng: 'daegu-seogu',
        dongStations: {
          'naedang-dong': '내당동',
          'bisan-dong': '비산동',
          'pyeongni-dong': '평리동',
          'sangjungi-dong': '상중이동',
          'wondae-dong': '원대동',
          'wondae-station': '원대역',
          'naedang-station': '내당역',
          'bukgu-cheong-station': '북구청역',
        },
      },
      namgu: {
        districtsname: '남구',
        districtseng: 'daegu-namgu',
        dongStations: {
          'icheon-dong': '이천동',
          'bongdeok-dong': '봉덕동',
          'daemyeong-dong': '대명동',
          'seongdangmot-station': '성당못역',
          'anjirang-station': '안지랑역',
          'yeongdaebyeongwon-station': '영대병원역',
          'daebonggyo-station': '대봉교역',
          'geondeulbawi-station': '건들바위역',
          'hyeonchungro-station': '현충로역',
          'daemyeong-station': '대명역',
          'gyodae-station': '교대역',
          'myeongdeok-station': '명덕역',
        },
      },
      bukgu: {
        districtsname: '북구',
        districtseng: 'daegu-bukgu',
        dongStations: {
          'goseong-dong': '고성동',
          'chilseong-dong': '칠성동',
          'chimsan-dong': '침산동',
          'sangyeok-dong': '산격동',
          'daehyeon-dong': '대현동',
          'bokhyeon-dong': '복현동',
          'geomdan-dong': '검단동',
          'mutaejoya-dong': '무태조야동',
          'gwanmun-dong': '관문동',
          'taejeon-dong': '태전동',
          'guam-dong': '구암동',
          'gwaneum-dong': '관음동',
          'eumnae-dong': '읍내동',
          'dongcheon-dong': '동천동',
          'nowon-dong': '노원동',
          'gug-u-dong': '국우동',
          'chilgok-unam-station': '칠곡운암역',
          'paldal-station': '팔달역',
          'gongdan-station': '공단역',
          'chilgok-gyeongdae-station': '칠곡경대병원역',
          'maecheon-market-station': '매천시장역',
          'paldal-market-station': '팔달시장역',
          'taejeon-station': '태전역',
          'maecheon-station': '매천역',
          'palgeo-station': '팔거역',
          'guam-station': '구암역',
          'dongcheon-station': '동천역',
          'hakjeong-station': '학정역',
          'manpyeong-station': '만평역',
          'chilseong-market-station': '칠성시장역',
          'daegu-station': '대구역',
        },
      },
      suseong: {
        districtsname: '수성구',
        districtseng: 'daegu-suseong',
        dongStations: {
          'suseong-market-station': '수성시장역',
          'jisan-station': '지산역',
          'yongji-station': '용지역',
          'daegueunhaeng-station': '대구은행역',
          'manchon-station': '만촌역',
          'eorinihwegwan-station': '어린이회관역',
          'suseongmot-station': '수성못역',
          'sawol-station': '사월역',
          'yeonho-station': '연호역',
          'beommul-station': '범물역',
          'sinmae-station': '신매역',
          'hwanggeum-station': '황금역',
          'daegongwon-station': '대공원역',
          'damti-station': '담티역',
          'gosan-station': '고산역',
          'rangeum-station': '범어역',
          'suseong-gu-office-station': '수성구청역',
          'suseong-gu-min-station': '수성구민운동장역',
        },
      },
      dalseo: {
        districtsname: '달서구',
        districtseng: 'daegu-dalseo',
        dongStations: {
          'songhyeon-station': '송현역',
          'gyeongmyeongdae-station': '계명대역',
          'igok-station': '이곡역',
          'wolchon-station': '월촌역',
          'duryu-station': '두류역',
          'yongsan-station': '용산역',
          'bangogae-station': '반고개역',
          'jingcheon-station': '진천역',
          'wolbae-station': '월배역',
          'daegok-station': '대곡역',
          'sangin-station': '상인역',
          'seongseo-station': '성서산업단지역',
          'jukjeon-station': '죽전역',
          'gangchang-station': '강창역',
          'gamsam-station': '감삼역',
        },
      },
      dalsung: {
        districtsname: '달성군',
        districtseng: 'daegu-dalsung',
        dongStations: {
          'hwawon-station': '화원역',
          'seolhwamyeonggok-station': '설화명곡역',
          'daesil-station': '대실역',
          'dasa-station': '다사역',
          'munyang-station': '문양역',
        },
      },
    },
  },
  incheon: {
    regionName: '인천',
    regionEng: 'incheon',
    districts: {
      junggu: {
        districtsname: '중구',
        districtseng: 'incheon-junggu',
        dongStations: {
          'yeonan-dong': '연안동',
          'sinpo-dong': '신포동',
          'sinheung-dong': '신흥동',
          'dowon-dong': '도원동',
          'yulmok-dong': '율목동',
          'dongincheon-dong': '동인천동',
          'gaehang-dong': '개항동',
          'yeongjong-dong': '영종동',
          'unseo-dong': '운서동',
          'yongyu-dong': '용유동',
          'dongincheon-station': '동인천역',
          'dowon-station': '도원역',
          'airport-cargo-station': '공항화물청사역',
          'unseo-station': '운서역',
          'incheon-station': '인천역',
          'incheon-airport-station': '인천국제공항역',
          'yeongjong-station': '영종역',
          'sinpo-station': '신포역',
        },
      },
      donggu: {
        districtsname: '동구',
        districtseng: 'incheon-donggu',
        dongStations: {
          'manseok-dong': '만석동',
          'hwasuhwapyeong-dong': '화수화평동',
          'hwasu-dong': '화수동',
          'songhyeon-dong': '송현동',
          'songnim-dong': '송림동',
          'geumchang-dong': '금창동',
        },
      },
      michuhol: {
        districtsname: '미추홀',
        districtseng: 'incheon-michuhol',
        dongStations: {
          'sungeui-dong': '숭의동',
          'yonghyeon-dong': '용현동',
          'hakik-dong': '학익동',
          'dohwa-dong': '도화동',
          'juan-dong': '주안동',
          'gyangyo-dong': '관교동',
          'munhak-dong': '문학동',
          'jemulpo-station': '제물포역',
          'citizen-park-station': '시민공원역',
          'seokbawi-market-station': '석바위시장역',
          'incheon-terminal-station': '인천터미널역',
          'inha-station': '인하대역',
          'sungeui-station': '숭의역',
          'juan-station': '주안역',
          'dohwa-station': '도화역',
          'moraenae-market-station': '모래내시장역',
        },
      },
      yeonsu: {
        districtsname: '연수',
        districtseng: 'incheon-yeonsu',
        dongStations: {
          'ongnyeon-dong': '옥련동',
          'seonhak-dong': '선학동',
          'yeonsu-dong': '연수동',
          'cheonghak-dong': '청학동',
          'dongchun-dong': '동춘동',
          'songdo-dong': '송도동',
          'yeonsu-station': '연수역',
          'techno-park-station': '테크노파크역',
          'campus-town-station': '캠퍼스타운역',
          'international-business-station': '국제업무지구역',
          'woninjae-station': '원인재역',
          'central-park-station': '센트럴파크역',
          'incheon-univ-station': '인천대입구역',
          'knowledge-info-station': '지식정보단지역',
          'munhak-stadium-station': '문학경기장역',
          'dongmak-station': '동막역',
          'dongchun-station': '동춘역',
          'sinyeonsu-station': '신연수역',
          'songdo-station': '송도역',
          'seonhak-station': '선학역',
        },
      },
      namdong: {
        districtsname: '남동',
        districtseng: 'incheon-namdong',
        dongStations: {
          'guwol-dong': '구월동',
          'ganseok-dong': '간석동',
          'mansu-dong': '만수동',
          'jangsu-seochang-dong': '장수서창동',
          'seochang-dong': '서창동',
          'namchon-dorim-dong': '남촌도림동',
          'nonhyeon-dong': '논현동',
          'nonhyeon-gojan-dong': '논현고잔동',
          'incheon-city-hall-station': '인천시청역',
          'namdong-gu-office-station': '남동구청역',
          'seokcheon-sageori-station': '석천사거리역',
          'ganseok-ogeori-station': '간석오거리역',
          'incheon-city-hall2-station': '인천시청역',
          'art-center-station': '예술회관역',
          'incheon-nonhyeon-station': '인천논현역',
          'incheon-grand-park-station': '인천대공원역',
          'sorae-pogu-station': '소래포구역',
          'hogupo-station': '호구포역',
          'namdong-induspark-station': '남동인더스파크역',
          'unyeon-station': '운연역',
          'ganseok-station': '간석역',
          'mansu-station': '만수역',
        },
      },
      bupyeong: {
        districtsname: '부평',
        districtseng: 'incheon-bupyeong',
        dongStations: {
          'bupyeong-dong': '부평동',
          'sangok-dong': '산곡동',
          'cheongcheon-dong': '청천동',
          'galsan-dong': '갈산동',
          'samsan-dong': '삼산동',
          'bugae-dong': '부개동',
          'ilsin-dong': '일신동',
          'sipjeong-dong': '십정동',
          'baegun-station': '백운역',
          'samsan-gym-station': '삼산체육관역',
          'bugae-station': '부개역',
          'dongam-station': '동암역',
          'bupyeong-station': '부평역',
          'dongsu-station': '동수역',
          'bupyeong-gu-office-station': '부평구청역',
          'bupyeong-market-station': '부평시장역',
          'gulpocheon-station': '굴포천역',
          'galsan-station': '갈산역',
          'bupyeong-samgeori-station': '부평삼거리역',
        },
      },
      gyeyang: {
        districtsname: '계양',
        districtseng: 'incheon-gyeyang',
        dongStations: {
          'hyoseong-dong': '효성동',
          'gyesan-dong': '계산동',
          'jakjeon-dong': '작전동',
          'jakjeon-seoun-dong': '작전서운동',
          'gyeyang-dong': '계양동',
          'bakchon-station': '박촌역',
          'gyeyang-station': '계양역',
          'gyeongin-gyodae-station': '경인교대입구역',
          'jakjeon-station': '작전역',
          'imhak-station': '임학역',
          'gyesan-station': '계산역',
          'gyulhyeon-station': '귤현역',
        },
      },
      seogu: {
        districtsname: '서구',
        districtseng: 'incheon-seogu',
        dongStations: {
          'geomam-gyeongseo-dong': '검암경서동',
          'yeonhui-dong': '연희동',
          'cheongna-dong': '청라동',
          'gajeong-dong': '가정동',
          'seoknam-dong': '석남동',
          'sinhyeon-wonchang-dong': '신현원창동',
          'gajwa-dong': '가좌동',
          'geomdan-dong': '검단동',
          'bullo-daegok-dong': '불로대곡동',
          'wondang-dong': '원당동',
          'dangha-dong': '당하동',
          'oryu-wangil-dong': '오류왕길동',
          'majeon-dong': '마전동',
          'ara-dong': '아라동',
          'dokjeong-station': '독정역',
          'geomam-station': '검암역',
          'gajaeul-station': '가재울역',
          'seobu-women-station': '서부여성회관역',
          'seogu-cheong-station': '서구청역',
          'incheon-gajwa-station': '인천가좌역',
          'geomdan-oryu-station': '검단오류역',
          'geomdan-sageori-station': '검단사거리역',
          'cheongna-city-station': '청라국제도시역',
          'juan-industrial-station': '주안국가산단역',
          'wanjeong-station': '완정역',
          'gajeong-central-market-station': '가정중앙시장역',
          'majeon-station': '마전역',
          'geombawi-station': '검바위역',
          'geomam2-station': '검암역',
          'gajeong-station': '가정역',
          'wangil-station': '왕길역',
          'asiad-stadium-station': '아시아드경기장역',
          'seoknam-station': '석남역',
        },
      },
      ganghwa: {
        districtsname: '강화',
        districtseng: 'incheon-ganghwa',
        dongStations: {
          'ganghwa-eup': '강화읍',
          'seonwon-myeon': '선원면',
          'buleun-myeon': '불은면',
          'gilsang-myeon': '길상면',
          'hwado-myeon': '화도면',
          'yangdo-myeon': '양도면',
          'naega-myeon': '내가면',
          'hajeom-myeon': '하점면',
          'yangsa-myeon': '양사면',
          'songhae-myeon': '송해면',
          'gyodong-myeon': '교동면',
          'samsan-myeon': '삼산면',
          'seodo-myeon': '서도면',
        },
      },
      ongjin: {
        districtsname: '옹진',
        districtseng: 'incheon-ongjin',
        dongStations: {
          'bukdo-myeon': '북도면',
          'baengnyeong-myeon': '백령면',
          'daecheong-myeon': '대청면',
          'deokjeok-myeon': '덕적면',
          'yeongheung-myeon': '영흥면',
          'jawol-myeon': '자월면',
          'yeonpyeong-myeon': '연평면',
        },
      },
    },
  },
  gwangju: {
    regionName: '광주',
    regionEng: 'gwangju',
    districts: {
      donggu: {
        districtsname: '동구',
        districtseng: 'gwangju-donggu',
        dongStations: {
          'chungjang-dong': '충장동',
          'dongmyeong-dong': '동명동',
          'gyerim-dong': '계림동',
          'sansu-dong': '산수동',
          'jisan-dong': '지산동',
          'seonam-dong': '서남동',
          'hak-dong': '학동',
          'hakun-dong': '학운동',
          'jiwon-dong': '지원동',
          'nokdong-station': '녹동역',
          'sotae-station': '소태역',
          'geumnamro-4ga-station': '금남로4가역',
          'munhwa-jeondang-station': '문화전당역',
          'hakdong-jungsimsa-station': '학동중심사역',
          'namgwangju-station': '남광주역',
        },
      },
      seogu: {
        districtsname: '서구',
        districtseng: 'gwangju-seogu',
        dongStations: {
          'yang-dong': '양동',
          'nongseong-dong': '농성동',
          'gwangcheon-dong': '광천동',
          'yudeok-dong': '유덕동',
          'chipyeong-dong': '치평동',
          'sangmu-dong': '상무동',
          'hwajeong-dong': '화정동',
          'seochang-dong': '서창동',
          'geumho-dong': '금호동',
          'pungam-dong': '풍암동',
          'dongcheon-dong': '동천동',
          'ssangchon-station': '쌍촌역',
          'sangmu-station': '상무역',
          'dol-gogae-station': '돌고개역',
          'uncheon-station': '운천역',
          'honam-univ-station': '호남대입구역',
          'nongseong-station': '농성역',
          'hwajeong-station': '화정역',
          'kimdaejung-convention-station': '김대중컨벤션센터역',
          'yangdong-market-station': '양동시장역',
        },
      },
      namgu: {
        districtsname: '남구',
        districtseng: 'gwangju-namgu',
        dongStations: {
          'yangrim-dong': '양림동',
          'bangrim-dong': '방림동',
          'bongseon-dong': '봉선동',
          'sajik-dong': '사직동',
          'wolsan-dong': '월산동',
          'baegun-dong': '백운동',
          'juwol-dong': '주월동',
          'jinwol-dong': '진월동',
          'hyodeok-dong': '효덕동',
          'songam-dong': '송암동',
          'daechon-dong': '대촌동',
        },
      },
      bukgu: {
        districtsname: '북구',
        districtseng: 'gwangju-bukgu',
        dongStations: {
          'junghung-dong': '중흥동',
          'jungang-dong': '중앙동',
          'imdong-dong': '임동',
          'sinan-dong': '신안동',
          'yongbong-dong': '용봉동',
          'unam-dong': '운암동',
          'dongrim-dong': '동림동',
          'usan-dong': '우산동',
          'punghyang-dong': '풍향동',
          'munhwa-dong': '문화동',
          'munheung-dong': '문흥동',
          'duam-dong': '두암동',
          'samgak-dong': '삼각동',
          'ilgok-dong': '일곡동',
          'maegok-dong': '매곡동',
          'ochi-dong': '오치동',
          'seokgok-dong': '석곡동',
          'geonguk-dong': '건국동',
          'yangsan-dong': '양산동',
          'sinyong-dong': '신용동',
          'geumnamro-5ga-station': '금남로5가역',
        },
      },
      gwangsan: {
        districtsname: '광산',
        districtseng: 'gwangju-gwangsan',
        dongStations: {
          'songjeong-park-station': '송정공원역',
          'gwangjusongjeong-station': '광주송정역',
          'dosan-station': '도산역',
          'pyeongdong-station': '평동역',
          'gonghang-station': '공항역',
        },
      },
    },
  },
  daejeon: {
    regionName: '대전',
    regionEng: 'daejeon',
    districts: {
      donggu: {
        districtsname: '동구',
        districtseng: 'daejeon-donggu',
        dongStations: {
          'jungang-dong': '중앙동',
          'hyo-dong': '효동',
          'sinin-dong': '신인동',
          'panam-dong': '판암동',
          'yongun-dong': '용운동',
          'dae-dong': '대동',
          'jayang-dong': '자양동',
          'gayang-dong': '가양동',
          'yongjeon-dong': '용전동',
          'seongnam-dong': '성남동',
          'hongdo-dong': '홍도동',
          'samseong-dong': '삼성동',
          'daecheong-dong': '대청동',
          'sannae-dong': '산내동',
          'dae-dong-station': '대동역',
          'daejeon-station': '대전역',
          'panam-station': '판암역',
          'sinheung-station': '신흥역',
        },
      },
      junggu: {
        districtsname: '중구',
        districtseng: 'daejeon-junggu',
        dongStations: {
          'eunhaengseonhwa-dong': '은행선화동',
          'mok-dong': '목동',
          'jungchon-dong': '중촌동',
          'daeheung-dong': '대흥동',
          'munchang-dong': '문창동',
          'seokgyo-dong': '석교동',
          'daesa-dong': '대사동',
          'busa-dong': '부사동',
          'yongdu-dong': '용두동',
          'oryu-dong': '오류동',
          'taepyeong-dong': '태평동',
          'yucheon-dong': '유천동',
          'munhwa-dong': '문화동',
          'sanseong-dong': '산성동',
          'jungangro-station': '중앙로역',
          'junggu-cheong-station': '중구청역',
          'seodaejeon-negeori-station': '서대전네거리역',
          'oryong-station': '오룡역',
        },
      },
      seogu: {
        districtsname: '서구',
        districtseng: 'daejeon-seogu',
        dongStations: {
          'boksu-dong': '복수동',
          'doma-dong': '도마동',
          'jeongnim-dong': '정림동',
          'byeon-dong': '변동',
          'yongmun-dong': '용문동',
          'tanbang-dong': '탄방동',
          'goejeong-dong': '괴정동',
          'gajang-dong': '가장동',
          'nae-dong': '내동',
          'galma-dong': '갈마동',
          'wolpyeong-dong': '월평동',
          'gasuwon-dong': '가수원동',
          'doan-dong': '도안동',
          'gwanjeo-dong': '관저동',
          'giseong-dong': '기성동',
          'dunsan-dong': '둔산동',
          'mannyeon-dong': '만년동',
          'city-hall-station': '시청역',
          'government-complex-station': '정부청사역',
          'galma-station': '갈마역',
          'wolpyeong-station': '월평역',
          'tanbang-station': '탄방역',
          'yongmun-station': '용문역',
          'gapcheon-station': '갑천역',
        },
      },
      yuseong: {
        districtsname: '유성',
        districtseng: 'daejeon-yuseong',
        dongStations: {
          'jinjam-dong': '진잠동',
          'hakha-dong': '학하동',
          'sangdae-dong': '상대동',
          'oncheon-dong': '온천동',
          'noeun-dong': '노은동',
          'sinseong-dong': '신성동',
          'jeonmin-dong': '전민동',
          'gujeuk-dong': '구즉동',
          'gwanpyeong-dong': '관평동',
          'wonsinheung-dong': '원신흥동',
          'noeun-station': '노은역',
          'worldcup-stadium-station': '월드컵경기장역',
          'hyunchungwon-station': '현충원역',
          'yuseong-oncheon-station': '유성온천역',
          'jijok-station': '지족역',
          'banseok-station': '반석역',
          'guam-station': '구암역',
        },
      },
      daedeok: {
        districtsname: '대덕',
        districtseng: 'daejeon-daedeok',
        dongStations: {
          'ojeong-dong': '오정동',
          'daehwa-dong': '대화동',
          'hoedeok-dong': '회덕동',
          'birae-dong': '비래동',
          'songchon-dong': '송촌동',
          'jungni-dong': '중리동',
          'sintanjin-dong': '신탄진동',
          'seokbong-dong': '석봉동',
          'deogam-dong': '덕암동',
          'moksang-dong': '목상동',
          'beop-dong': '법동',
        },
      },
    },
  },
  sejong: {
    regionName: '세종',
    regionEng: 'sejong',
    districts: {
      sejong: {
        districtsname: '세종특별자치시',
        districtseng: 'sejong',
        dongStations: {
          'jochiwon-eup': '조치원읍',
          'yeongi-myeon': '연기면',
          'yeondong-myeon': '연동면',
          'bugang-myeon': '부강면',
          'geumnam-myeon': '금남면',
          'janggun-myeon': '장군면',
          'yeonseo-myeon': '연서면',
          'jeonui-myeon': '전의면',
          'jeondong-myeon': '전동면',
          'sojeong-myeon': '소정면',
          'hansol-dong': '한솔동',
          'saerom-dong': '새롬동',
          'dodam-dong': '도담동',
          'haemil-dong': '해밀동',
          'areum-dong': '아름동',
          'jongchon-dong': '종촌동',
          'goun-dong': '고운동',
          'sodam-dong': '소담동',
          'bangok-dong': '반곡동',
          'boram-dong': '보람동',
          'daepyeong-dong': '대평동',
          'dajeong-dong': '다정동',
        },
      },
    },
  },
  gyeonggi: {
    regionName: '경기',
    regionEng: 'gyeonggi',
    districts: {
      suwon: {
        districtsname: '수원',
        districtseng: 'gyeonggi-suwon',
        dongStations: {
          'pajang-dong': '파장동',
          'yulcheon-dong': '율천동',
          'jeongja-dong': '정자동',
          'yeonghwa-dong': '영화동',
          'songjuk-dong': '송죽동',
          'jowon-dong': '조원동',
          'yeonmu-dong': '연무동',
          'seryu-dong': '세류동',
          'pyeong-dong': '평동',
          'seodun-dong': '서둔동',
          'guun-dong': '구운동',
          'geumgok-dong': '금곡동',
          'homaesil-dong': '호매실동',
          'gwonseon-dong': '권선동',
          'gokseon-dong': '곡선동',
          'ipbuk-dong': '입북동',
          'maegyo-dong': '매교동',
          'maesan-dong': '매산동',
          'godeung-dong': '고등동',
          'hwaseo-dong': '화서동',
          'ji-dong': '지동',
          'uman-dong': '우만동',
          'ingye-dong': '인계동',
          'haenggung-dong': '행궁동',
          'maetan-dong': '매탄동',
          'woncheon-dong': '원천동',
          'yeongtong-dong': '영통동',
          'mangpo-dong': '망포동',
          'gwanggyo-dong': '광교동',
          'cheongmyeong-station': '청명역',
          'suwon-city-hall-station': '수원시청역',
          'maegyo-station': '매교역',
          'sungkyunkwan-station': '성균관대역',
          'suwon-station': '수원역',
          'yeongtong-station': '영통역',
          'mangpo-station': '망포역',
          'hwaseo-station': '화서역',
          'maetan-gwonseon-station': '매탄권선역',
          'seryu-station': '세류역',
          'gwanggyo-station': '광교역',
          'gwanggyo-jungang-station': '광교중앙역',
          'kyonggi-station': '경기대역',
          'ajou-station': '아주대역',
        },
      },
      seongnam: {
        districtsname: '성남',
        districtseng: 'gyeonggi-seongnam',
        dongStations: {
          'sinheung-dong': '신흥동',
          'taepyeong-dong': '태평동',
          'sujin-dong': '수진동',
          'dandae-dong': '단대동',
          'sanseong-dong': '산성동',
          'yangji-dong': '양지동',
          'bokjeong-dong': '복정동',
          'wirye-dong': '위례동',
          'sinchon-dong': '신촌동',
          'siheung-dong': '시흥동',
          'seongnam-dong': '성남동',
          'jungang-dong': '중앙동',
          'geumgwang-dong': '금광동',
          'eunhaeng-dong': '은행동',
          'sangdaewon-dong': '상대원동',
          'hadaewon-dong': '하대원동',
          'dochon-dong': '도촌동',
          'bundang-dong': '분당동',
          'sunae-dong': '수내동',
          'seohyeon-dong': '서현동',
          'imae-dong': '이매동',
          'yatap-dong': '야탑동',
          'pangyo-dong': '판교동',
          'sampyeong-dong': '삼평동',
          'baekhyeon-dong': '백현동',
          'gumi-dong': '구미동',
          'unjung-dong': '운중동',
          'gujeonggu-dong': '구정구',
          'sunae-station': '수내역',
          'jeongbal-san-station': '정발산역',
          'gachon-station': '가천대역',
          'migeum-station': '미금역',
          'ori-station': '오리역',
          'pangyo-station': '판교역',
          'seohyeon-station': '서현역',
          'dandae-ogeori-station': '단대오거리역',
          'sujin-station': '수진역',
          'taepyeong-station': '태평역',
          'yatap-station': '야탑역',
          'imae-station': '이매역',
          'namhansanseong-station': '남한산성입구역',
          'sanseong-station': '산성역',
          'sinheung-station': '신흥역',
        },
      },
      uijeongbu: {
        districtsname: '의정부',
        districtseng: 'gyeonggi-uijeongbu',
        dongStations: {
          'uijeongbu-dong': '의정부동',
          'howon-dong': '호원동',
          'jangam-dong': '장암동',
          'singok-dong': '신곡동',
          'songsan-dong': '송산동',
          'jageum-dong': '자금동',
          'ganeung-dong': '가능동',
          'heungseon-dong': '흥선동',
          'nogyang-dong': '녹양동',
          'balgok-station': '발곡역',
          'tapseok-station': '탑석역',
          'beomgol-station': '범골역',
          'ganeung-station': '가능역',
          'gyeonggi-bukbu-station': '경기도청북부청사역',
          'uijeongbu-city-hall-station': '의정부시청역',
          'gonje-station': '곤제역',
          'hoeryong-station': '회룡역',
          'eoryong-station': '어룡역',
          'mangwolsa-station': '망월사역',
          'uijeongbu-station': '의정부역',
          'dong-o-station': '동오역',
          'hyoja-station': '효자역',
          'heungseon-station': '흥선역',
          'uijeongbu-jungang-station': '의정부중앙역',
          'songsan-station': '송산역',
          'saemal-station': '새말역',
          'nogyang-station': '녹양역',
          'jangam-station': '장암역',
          'uijeongbu-lrt-station': '경전철의정부역',
        },
      },
      anyang: {
        districtsname: '안양',
        districtseng: 'gyeonggi-anyang',
        dongStations: {
          'anyang-dong': '안양동',
          'seoksu-dong': '석수동',
          'bakdal-dong': '박달동',
          'bisan-dong': '비산동',
          'buheung-dong': '부흥동',
          'dalan-dong': '달안동',
          'gwanyang-dong': '관양동',
          'burim-dong': '부림동',
          'pyeongchon-dong': '평촌동',
          'pyeongan-dong': '평안동',
          'gwiin-dong': '귀인동',
          'hogye-dong': '호계동',
          'beomgye-dong': '범계동',
          'galsan-dong': '갈산동',
          'pyeongchon-station': '평촌역',
          'myeonghak-station': '명학역',
          'gwanak-station': '관악역',
          'seoksu-station': '석수역',
          'indeogwon-station': '인덕원역',
          'anyang-station': '안양역',
          'beomgye-station': '범계역',
        },
      },
      bucheon: {
        districtsname: '부천',
        districtseng: 'gyeonggi-bucheon',
        dongStations: {
          'simgok-dong': '심곡동',
          'bucheon-dong': '부천동',
          'jung-dong': '중동',
          'sinjung-dong': '신중동',
          'sang-dong': '상동',
          'daesan-dong': '대산동',
          'sosabon-dong': '소사본동',
          'beoman-dong': '범안동',
          'seonggok-dong': '성곡동',
          'ojeong-dong': '오정동',
          'sosa-station': '소사역',
          'jung-dong-station': '중동역',
          'bucheon-station': '부천역',
          'gachiwul-station': '까치울역',
          'bucheon-sports-station': '부천종합운동장역',
          'chunui-station': '춘의역',
          'yeokgok-station': '역곡역',
          'songnae-station': '송내역',
          'sinjung-dong-station': '신중동역',
          'bucheon-city-hall-station': '부천시청역',
          'sang-dong-station': '상동역',
        },
      },
      gwangmyeong: {
        districtsname: '광명',
        districtseng: 'gyeonggi-gwangmyeong',
        dongStations: {
          'gwangmyeong-dong': '광명동',
          'cheolsan-dong': '철산동',
          'haan-dong': '하안동',
          'soha-dong': '소하동',
          'iljik-dong': '일직동',
          'hagon-dong': '학온동',
          'gwangmyeong-station': '광명역',
          'gwangmyeong-sageori-station': '광명사거리역',
          'cheolsan-station': '철산역',
        },
      },
      pyeongtaek: {
        districtsname: '평택',
        districtseng: 'gyeonggi-pyeongtaek',
        dongStations: {
          'pyeongseong-eup': '팽성읍',
          'anjung-eup': '안중읍',
          'poseung-eup': '포승읍',
          'cheongbuk-eup': '청북읍',
          'jinwi-myeon': '진위면',
          'seotan-myeon': '서탄면',
          'godeok-myeon': '고덕면',
          'oseong-myeon': '오성면',
          'hyeondeok-myeon': '현덕면',
          'seojeong-dong': '서정동',
          'songtan-dong': '송탄동',
          'jisan-dong': '지산동',
          'songbuk-dong': '송북동',
          'sinjang-dong': '신장동',
          'sinpyeong-dong': '신평동',
          'wonpyeong-dong': '원평동',
          'tongbok-dong': '통복동',
          'bijeon-dong': '비전동',
          'yongi-dong': '용이동',
          'segyo-dong': '세교동',
          'dongsak-dong': '동삭동',
          'godeok-dong': '고덕동',
          'jinwi-station': '진위역',
          'pyeongtaek-station': '평택역',
          'songtan-station': '송탄역',
          'seojeongri-station': '서정리역',
          'jije-station': '지제역',
        },
      },
      gwacheon: {
        districtsname: '과천',
        districtseng: 'gyeonggi-gwacheon',
        dongStations: {
          'galhyeon-dong': '갈현동',
          'byeoryang-dong': '별양동',
          'gwacheon-dong': '과천동',
          'munwon-dong': '문원동',
          'gyeongma-park-station': '경마공원역',
          'government-gwacheon-station': '정부과천청사역',
          'seonbawi-station': '선바위역',
          'gwacheon-station': '과천역',
          'daegongwon-station': '대공원역',
        },
      },
      guri: {
        districtsname: '구리',
        districtseng: 'gyeonggi-guri',
        dongStations: {
          'galmae-dong': '갈매동',
          'donggu-dong': '동구동',
          'inchang-dong': '인창동',
          'gyomun-dong': '교문동',
          'sutaek-dong': '수택동',
          'guri-station': '구리역',
          'galmae-station': '갈매역',
        },
      },
      namyangju: {
        districtsname: '남양주',
        districtseng: 'gyeonggi-namyangju',
        dongStations: {
          'wabu-eup': '와부읍',
          'jinjeop-eup': '진접읍',
          'hwado-eup': '화도읍',
          'jingeon-eup': '진건읍',
          'onam-eup': '오남읍',
          'toegyewon-eup': '퇴계원읍',
          'byeollae-myeon': '별내면',
          'sudong-myeon': '수동면',
          'joan-myeon': '조안면',
          'hopyeong-dong': '호평동',
          'pyeongnae-dong': '평내동',
          'yangjeong-dong': '양정동',
          'dasan-dong': '다산동',
          'byeollae-dong': '별내동',
          'deokso-station': '덕소역',
          'doshim-station': '도심역',
          'ungilsan-station': '운길산역',
          'geumgok-station': '금곡역',
          'paldang-station': '팔당역',
          'toegyewon-station': '퇴계원역',
          'sareung-station': '사릉역',
          'dunong-station': '도농역',
          'pyeongnae-hopyeong-station': '평내호평역',
          'yangjeong-station': '양정역',
          'maseok-station': '마석역',
          'cheonmasan-station': '천마산역',
          'byeollae-station': '별내역',
        },
      },
      ansan: {
        districtsname: '안산',
        districtseng: 'gyeonggi-ansan',
        dongStations: {
          'il-dong': '일동',
          'i-dong': '이동',
          'sa-dong': '사동',
          'sai-dong': '사이동',
          'haeyang-dong': '해양동',
          'bono-dong': '본오동',
          'bugok-dong': '부곡동',
          'wolpi-dong': '월피동',
          'seongpo-dong': '성포동',
          'banwol-dong': '반월동',
          'ansan-dong': '안산동',
          'wa-dong': '와동',
          'gojan-dong': '고잔동',
          'hosu-dong': '호수동',
          'wongok-dong': '원곡동',
          'baegun-dong': '백운동',
          'singil-dong': '신길동',
          'choji-dong': '초지동',
          'seonbu-dong': '선부동',
          'daebu-dong': '대부동',
          'gojan-station': '고잔역',
          'singiloncheon-station': '신길온천역',
          'banwol-station': '반월역',
          'choji-station': '초지역',
          'jungang-station': '중앙역',
          'handaegap-station': '한대앞역',
          'sangnoksu-station': '상록수역',
          'ansan-station': '안산역',
        },
      },
      osan: {
        districtsname: '오산',
        districtseng: 'gyeonggi-osan',
        dongStations: {
          'namchon-dong': '남촌동',
          'sema-dong': '세마동',
          'chopyeong-dong': '초평동',
          'daewon-dong': '대원동',
          'seodongtan-station': '서동탄역',
          'osan-station': '오산역',
          'osan-dae-station': '오산대역',
          'sema-station': '세마역',
        },
      },
      siheung: {
        districtsname: '시흥',
        districtseng: 'gyeonggi-siheung',
        dongStations: {
          'daeya-dong': '대야동',
          'sincheon-dong': '신천동',
          'sinhyeon-dong': '신현동',
          'maehwa-dong': '매화동',
          'mokgam-dong': '목감동',
          'gunja-dong': '군자동',
          'wolgot-dong': '월곶동',
          'jeongwangbon-dong': '정왕본동',
          'jeongwang-dong': '정왕동',
          'baegot-dong': '배곧동',
          'gwarim-dong': '과림동',
          'yeonseong-dong': '연성동',
          'janggok-dong': '장곡동',
          'wolgot-station': '월곶역',
          'jeongwang-station': '정왕역',
          'dalwol-station': '달월역',
          'oido-station': '오이도역',
        },
      },
      gunpo: {
        districtsname: '군포',
        districtseng: 'gyeonggi-gunpo',
        dongStations: {
          'gunpo-dong': '군포동',
          'sanbon-dong': '산본동',
          'geumjeong-dong': '금정동',
          'jaegung-dong': '재궁동',
          'ogeum-dong': '오금동',
          'suri-dong': '수리동',
          'gungnae-dong': '궁내동',
          'gwangjeong-dong': '광정동',
          'songbu-dong': '송부동',
          'sanbon-station': '산본역',
          'gunpo-station': '군포역',
          'dangjeong-station': '당정역',
          'surisan-station': '수리산역',
          'geumjeong-station': '금정역',
          'daeyami-station': '대야미역',
        },
      },
      uiwang: {
        districtsname: '의왕',
        districtseng: 'gyeonggi-uiwang',
        dongStations: {
          'gocheon-dong': '고천동',
          'ojeon-dong': '오전동',
          'naeson-dong': '내손동',
          'cheonggye-dong': '청계동',
          'uiwang-station': '의왕역',
        },
      },
      hanam: {
        districtsname: '하남',
        districtseng: 'gyeonggi-hanam',
        dongStations: {
          'cheonhyeon-dong': '천현동',
          'deokpung-dong': '덕풍동',
          'gambuk-dong': '감북동',
          'gamil-dong': '감일동',
          'chungung-dong': '춘궁동',
          'choi-dong': '초이동',
          'misa-dong': '미사동',
        },
      },
      yongin: {
        districtsname: '용인',
        districtseng: 'gyeonggi-yongin',
        dongStations: {
          'pogok-eup': '포곡읍',
          'mohyeon-eup': '모현읍',
          'idong-eup': '이동읍',
          'namsa-eup': '남사읍',
          'wonsam-myeon': '원삼면',
          'baegam-myeon': '백암면',
          'yangji-myeon': '양지면',
          'yeokbuk-dong': '역북동',
          'samga-dong': '삼가동',
          'yurim-dong': '유림동',
          'dongbu-dong': '동부동',
          'singal-dong': '신갈동',
          'yeongdeok-dong': '영덕동',
          'gugal-dong': '구갈동',
          'sanggal-dong': '상갈동',
          'bora-dong': '보라동',
          'giheung-dong': '기흥동',
          'seonong-dong': '서농동',
          'guseong-dong': '구성동',
          'mabuk-dong': '마북동',
          'dongbaek-dong': '동백동',
          'sangha-dong': '상하동',
          'bojeong-dong': '보정동',
          'pungdeokcheon-dong': '풍덕천동',
          'sinbong-dong': '신봉동',
          'jukjeon-dong': '죽전동',
          'dongcheon-dong': '동천동',
          'sanghyeon-dong': '상현동',
          'seongbok-dong': '성복동',
          'bopyeong-station': '보평역',
          'eojeong-station': '어정역',
          'city-hall-yongin-station': '시청.용인대역',
          'giheung-station': '기흥역',
          'jukjeon-station': '죽전역',
          'jiseok-station': '지석역',
          'gimryangjang-station': '김량장역',
          'jeondae-everland-station': '전대.에버랜드역',
          'gojin-station': '고진역',
          'guseong-station': '구성역',
          'sanggal-station': '상갈역',
          'gangnam-station': '강남대역',
          'dongbaek-station': '동백역',
          'sanghyeon-station': '상현역',
          'singal-station': '신갈역',
          'samga-station': '삼가역',
          'myeongji-station': '명지대역',
          'seongbok-station': '성복역',
          'sujigu-cheong-station': '수지구청역',
          'dunjeon-station': '둔전역',
          'chodang-station': '초당역',
          'dongcheon-station': '동천역',
          'undongjang-songdam-station': '운동장.송담대역',
          'bojeong-station': '보정역',
        },
      },
      paju: {
        districtsname: '파주',
        districtseng: 'gyeonggi-paju',
        dongStations: {
          'munsan-eup': '문산읍',
          'paju-eup': '파주읍',
          'beobwon-eup': '법원읍',
          'jori-eup': '조리읍',
          'wollong-myeon': '월롱면',
          'tanhyeon-myeon': '탄현면',
          'gwangtan-myeon': '광탄면',
          'papyeong-myeon': '파평면',
          'jeokseong-myeon': '적성면',
          'jangdan-myeon': '장단면',
          'geumchon-dong': '금촌동',
          'gyoha-dong': '교하동',
          'unjeong-dong': '운정동',
          'munsan-station': '문산역',
          'geumneung-station': '금릉역',
          'paju-station': '파주역',
          'geumchon-station': '금촌역',
          'wollong-station': '월롱역',
          'yadang-station': '야당역',
          'unjeong-station': '운정역',
        },
      },
      icheon: {
        districtsname: '이천',
        districtseng: 'gyeonggi-icheon',
        dongStations: {
          'janghowon-eup': '장호원읍',
          'bubal-eup': '부발읍',
          'sindun-myeon': '신둔면',
          'baeksa-myeon': '백사면',
          'hobeop-myeon': '호법면',
          'majang-myeon': '마장면',
          'daewol-myeon': '대월면',
          'moga-myeon': '모가면',
          'seolseong-myeon': '설성면',
          'yul-myeon': '율면',
          'changjeon-dong': '창전동',
          'jeungpo-dong': '증포동',
          'jungni-dong': '중리동',
          'gwan-go-dong': '관고동',
          'sindun-doye-station': '신둔도예촌역',
          'icheon-station': '이천역',
          'bubal-station': '부발역',
        },
      },
      anseong: {
        districtsname: '안성',
        districtseng: 'gyeonggi-anseong',
        dongStations: {
          'gongdo-eup': '공도읍',
          'bogae-myeon': '보개면',
          'geumgwang-myeon': '금광면',
          'seoun-myeon': '서운면',
          'miyang-myeon': '미양면',
          'daedeok-myeon': '대덕면',
          'yangseong-myeon': '양성면',
          'wongok-myeon': '원곡면',
          'iljuk-myeon': '일죽면',
          'juksan-myeon': '죽산면',
          'samjuk-myeon': '삼죽면',
          'gosam-myeon': '고삼면',
          'anseong-dong': '안성동',
        },
      },
      gimpo: {
        districtsname: '김포',
        districtseng: 'gyeonggi-gimpo',
        dongStations: {
          'tongjin-eup': '통진읍',
          'gochon-eup': '고촌읍',
          'yangchon-eup': '양촌읍',
          'daegot-myeon': '대곶면',
          'wolgot-myeon': '월곶면',
          'haseong-myeon': '하성면',
          'gimpobon-dong': '김포본동',
          'janggibon-dong': '장기본동',
          'sau-dong': '사우동',
          'pungmu-dong': '풍무동',
          'janggi-dong': '장기동',
          'gurae-dong': '구래동',
          'masan-dong': '마산동',
          'unyang-dong': '운양동',
        },
      },
      hwaseong: {
        districtsname: '화성',
        districtseng: 'gyeonggi-hwaseong',
        dongStations: {
          'bongdam-eup': '봉담읍',
          'ujeong-eup': '우정읍',
          'hyangnam-eup': '향남읍',
          'namyang-eup': '남양읍',
          'maesong-myeon': '매송면',
          'bibong-myeon': '비봉면',
          'mado-myeon': '마도면',
          'songsan-myeon': '송산면',
          'sosin-myeon': '서신면',
          'paltan-myeon': '팔탄면',
          'jangan-myeon': '장안면',
          'yanggam-myeon': '양감면',
          'jeongnam-myeon': '정남면',
          'saesol-dong': '새솔동',
          'jinan-dong': '진안동',
          'byeongjeom-dong': '병점동',
          'gibae-dong': '기배동',
          'hwasan-dong': '화산동',
          'dongtan-dong': '동탄동',
          'byeongjeom-station': '병점역',
        },
      },
      gwangju: {
        districtsname: '광주',
        districtseng: 'gyeonggi-gwangju',
        dongStations: {
          'opo-eup': '오포읍',
          'chowol-eup': '초월읍',
          'gonjiam-eup': '곤지암읍',
          'docheok-myeon': '도척면',
          'toechon-myeon': '퇴촌면',
          'namjong-myeon': '남종면',
          'namhansanseong-myeon': '남한산성면',
          'gyeongan-dong': '경안동',
          'songjeong-dong': '송정동',
          'ssangnyeong-dong': '쌍령동',
          'tanbeol-dong': '탄벌동',
          'gwangnam-dong': '광남동',
          'samdong-station': '삼동역',
          'chowol-station': '초월역',
          'gyeonggi-gwangju-station': '경기광주역',
          'gonjiam-station': '곤지암역',
        },
      },
      yeoju: {
        districtsname: '여주',
        districtseng: 'gyeonggi-yeoju',
        dongStations: {
          'ganam-eup': '가남읍',
          'jeomdong-myeon': '점동면',
          'heungcheon-myeon': '흥천면',
          'geumsa-myeon': '금사면',
          'sejong-daewang-myeon': '세종대왕면',
          'daesin-myeon': '대신면',
          'bungnae-myeon': '북내면',
          'gangcheon-myeon': '강천면',
          'sanbuk-myeon': '산북면',
          'yeoheung-dong': '여흥동',
          'ohak-dong': '오학동',
          'sejong-daewang-station': '세종대왕릉역',
          'yeoju-station': '여주역',
        },
      },
      goyang: {
        districtsname: '고양',
        districtseng: 'gyeonggi-goyang',
        dongStations: {
          'jugyo-dong': '주교동',
          'wonsin-dong': '원신동',
          'heungdo-dong': '흥도동',
          'seongsa-dong': '성사동',
          'hyoja-dong': '효자동',
          'samsong-dong': '삼송동',
          'changneung-dong': '창릉동',
          'goyang-dong': '고양동',
          'gwansan-dong': '관산동',
          'neunggok-dong': '능곡동',
          'hwajeong-dong': '화정동',
          'haengju-dong': '행주동',
          'haengsin-dong': '행신동',
          'hwajeon-dong': '화전동',
          'daedeok-dong': '대덕동',
          'siksa-dong': '식사동',
          'jungsan-dong': '중산동',
          'jeongbalsan-dong': '정발산동',
          'pungsan-dong': '풍산동',
          'baekseok-dong': '백석동',
          'madu-dong': '마두동',
          'janghang-dong': '장항동',
          'gobong-dong': '고봉동',
          'ilsan-dong': '일산동',
          'tanhyeon-dong': '탄현동',
          'juyeop-dong': '주엽동',
          'daehwa-dong': '대화동',
          'songpo-dong': '송포동',
          'deogi-dong': '덕이동',
          'gajwa-dong': '가좌동',
          'goksan-station': '곡산역',
          'neunggok-station': '능곡역',
          'jeongbalsan-station': '정발산역',
          'hwajeon-station': '화전역',
          'gangmae-station': '강매역',
          'daehwa-station': '대화역',
          'madu-station': '마두역',
          'baekseok-station': '백석역',
          'pungsan-station': '풍산역',
          'jichuk-station': '지축역',
          'baegma-station': '백마역',
          'ilsan-station': '일산역',
          'tanhyeon-station': '탄현역',
          'juyeop-station': '주엽역',
          'wondang-station': '원당역',
          'wonheung-station': '원흥역',
          'samsong-station': '삼송역',
          'haengsin-station': '행신역',
          'hwajeong-station': '화정역',
          'daegok-station': '대곡역',
        },
      },
      dongducheon: {
        districtsname: '동두천',
        districtseng: 'gyeonggi-dongducheon',
        dongStations: {
          'saengyeon-dong': '생연동',
          'bosan-dong': '보산동',
          'bulhyeon-dong': '불현동',
          'songnae-dong': '송내동',
          'soyo-dong': '소요동',
          'sangpae-dong': '상패동',
          'soyosan-station': '소요산역',
          'dongducheon-jungang-station': '동두천중앙역',
          'jihaeng-station': '지행역',
          'dongducheon-station': '동두천역',
          'bosan-station': '보산역',
        },
      },
      yangju: {
        districtsname: '양주',
        districtseng: 'gyeonggi-yangju',
        dongStations: {
          'baekseok-eup': '백석읍',
          'eunhyeon-myeon': '은현면',
          'nam-myeon': '남면',
          'gwangjeok-myeon': '광적면',
          'jangheung-myeon': '장흥면',
          'yangju-dong': '양주동',
          'hoecheon-dong': '회천동',
          'deokjeong-station': '덕정역',
          'yangju-station': '양주역',
          'deokgye-station': '덕계역',
        },
      },
      pocheon: {
        districtsname: '포천',
        districtseng: 'gyeonggi-pocheon',
        dongStations: {
          'soheul-eup': '소흘읍',
          'gunnae-myeon': '군내면',
          'naechon-myeon': '내촌면',
          'gasan-myeon': '가산면',
          'sinbuk-myeon': '신북면',
          'changsu-myeon': '창수면',
          'yeongjung-myeon': '영중면',
          'ildong-myeon': '일동면',
          'idong-myeon': '이동면',
          'yeongbuk-myeon': '영북면',
          'gwanin-myeon': '관인면',
          'hwahyeon-myeon': '화현면',
          'pocheon-dong': '포천동',
          'seondan-dong': '선단동',
        },
      },
      gapyeong: {
        districtsname: '가평',
        districtseng: 'gyeonggi-gapyeong',
        dongStations: {
          'gapyeong-eup': '가평읍',
          'seorak-myeon': '설악면',
          'cheongpyeong-myeon': '청평면',
          'sang-myeon': '상면',
          'jojong-myeon': '조종면',
          'buk-myeon': '북면',
          'cheongpyeong-station': '청평역',
          'gapyeong-station': '가평역',
          'daeseongri-station': '대성리역',
          'sangcheon-station': '상천역',
        },
      },
      yangpyeong: {
        districtsname: '양평',
        districtseng: 'gyeonggi-yangpyeong',
        dongStations: {
          'yangpyeong-eup': '양평읍',
          'gangsang-myeon': '강상면',
          'gangha-myeon': '강하면',
          'yangseo-myeon': '양서면',
          'okcheon-myeon': '옥천면',
          'seojong-myeon': '서종면',
          'danwol-myeon': '단월면',
          'cheongun-myeon': '청운면',
          'yangdong-myeon': '양동면',
          'jipyeong-myeon': '지평면',
          'yongmun-myeon': '용문면',
          'gaegun-myeon': '개군면',
          'jipyeong-station': '지평역',
          'wondeok-station': '원덕역',
          'yangpyeong-station': '양평역',
          'sinwon-station': '신원역',
          'yongmun-station': '용문역',
          'guksu-station': '국수역',
          'yangsu-station': '양수역',
          'asin-station': '아신역',
          'obin-station': '오빈역',
        },
      },
      yeoncheon: {
        districtsname: '연천',
        districtseng: 'gyeonggi-yeoncheon',
        dongStations: {
          'yeoncheon-eup': '연천읍',
          'jeongok-eup': '전곡읍',
          'gunnam-myeon': '군남면',
          'cheongsan-myeon': '청산면',
          'baekhak-myeon': '백학면',
          'misan-myeon': '미산면',
          'wangjing-myeon': '왕징면',
          'sinseo-myeon': '신서면',
          'jung-myeon': '중면',
          'jangnam-myeon': '장남면',
        },
      },
    },
  },
  gangwon: {
    regionName: '강원',
    regionEng: 'gangwon',
    districts: {
      chuncheon: {
        districtsname: '춘천',
        districtseng: 'gangwon-chuncheon',
        dongStations: {
          'sinbuk-eup': '신북읍',
          'dong-myeon': '동면',
          'dongsan-myeon': '동산면',
          'sindong-myeon': '신동면',
          'nam-myeon': '남면',
          'seo-myeon': '서면',
          'sabuk-myeon': '사북면',
          'buksan-myeon': '북산면',
          'dongnae-myeon': '동내면',
          'namsan-myeon': '남산면',
          'gyo-dong': '교동',
          'joun-dong': '조운동',
          'yaksamyeong-dong': '약사명동',
          'geunhwa-dong': '근화동',
          'soyang-dong': '소양동',
          'hupyeong-dong': '후평동',
          'hyoja-dong': '효자동',
          'seoksa-dong': '석사동',
          'toegye-dong': '퇴계동',
          'gangnam-dong': '강남동',
          'sinsau-dong': '신사우동',
          'kimyujeong-station': '김유정역',
          'chuncheon-station': '춘천역',
          'gangchon-station': '강촌역',
          'gulbongsan-station': '굴봉산역',
          'baegyangri-station': '백양리역',
          'namchuncheon-station': '남춘천역',
        },
      },
      wonju: {
        districtsname: '원주',
        districtseng: 'gangwon-wonju',
        dongStations: {
          'munmak-eup': '문막읍',
          'socho-myeon': '소초면',
          'hojeo-myeon': '호저면',
          'jijeong-myeon': '지정면',
          'buron-myeon': '부론면',
          'gwirae-myeon': '귀래면',
          'heungeop-myeon': '흥업면',
          'panbu-myeon': '판부면',
          'sillim-myeon': '신림면',
          'jungang-dong': '중앙동',
          'wonin-dong': '원인동',
          'gaeun-dong': '개운동',
          'myeongnyun-dong': '명륜동',
          'dangu-dong': '단구동',
          'ilsan-dong': '일산동',
          'hakseong-dong': '학성동',
          'dangye-dong': '단계동',
          'usan-dong': '우산동',
          'taejang-dong': '태장동',
          'bongsan-dong': '봉산동',
          'haenggu-dong': '행구동',
          'musil-dong': '무실동',
          'bangok-gwanseol-dong': '반곡관설동',
        },
      },
      gangneung: {
        districtsname: '강릉',
        districtseng: 'gangwon-gangneung',
        dongStations: {
          'jumunjin-eup': '주문진읍',
          'seongsan-myeon': '성산면',
          'wangsan-myeon': '왕산면',
          'gujeong-myeon': '구정면',
          'gangdong-myeon': '강동면',
          'okgye-myeon': '옥계면',
          'sacheon-myeon': '사천면',
          'yeongok-myeon': '연곡면',
          'hongje-dong': '홍제동',
          'okcheon-dong': '옥천동',
          'ponam-dong': '포남동',
          'chodang-dong': '초당동',
          'songjeong-dong': '송정동',
          'naegok-dong': '내곡동',
          'seongdeok-dong': '성덕동',
          'gyeongpo-dong': '경포동',
        },
      },
      donghae: {
        districtsname: '동해',
        districtseng: 'gangwon-donghae',
        dongStations: {
          'cheongok-dong': '천곡동',
          'buksam-dong': '북삼동',
          'bugok-dong': '부곡동',
          'dongho-dong': '동호동',
          'balhan-dong': '발한동',
          'mukho-dong': '묵호동',
          'bukpyeong-dong': '북평동',
          'mangsang-dong': '망상동',
          'samhwa-dong': '삼화동',
        },
      },
      taebaek: {
        districtsname: '태백',
        districtseng: 'gangwon-taebaek',
        dongStations: {
          'hwangji-dong': '황지동',
          'hwangyeon-dong': '황연동',
          'samsu-dong': '삼수동',
          'sangjang-dong': '상장동',
          'mungok-sodo-dong': '문곡소도동',
          'jangseong-dong': '장성동',
          'gumun-sodo-dong': '구문소동',
          'cheoram-dong': '철암동',
        },
      },
      sokcho: {
        districtsname: '속초',
        districtseng: 'gangwon-sokcho',
        dongStations: {
          'yeongnang-dong': '영랑동',
          'dongmyeong-dong': '동명동',
          'geumho-dong': '금호동',
          'nohak-dong': '노학동',
          'joyang-dong': '조양동',
          'cheongho-dong': '청호동',
          'daepo-dong': '대포동',
        },
      },
      samcheok: {
        districtsname: '삼척',
        districtseng: 'gangwon-samcheok',
        dongStations: {
          'dogye-eup': '도계읍',
          'wondeok-eup': '원덕읍',
          'geundeok-myeon': '근덕면',
          'hajang-myeon': '하장면',
          'nogok-myeon': '노곡면',
          'miro-myeon': '미로면',
          'gagok-myeon': '가곡면',
          'singi-myeon': '신기면',
          'namyang-dong': '남양동',
          'jeongna-dong': '정라동',
          'seongnae-dong': '성내동',
        },
      },
      hongcheon: {
        districtsname: '홍천',
        districtseng: 'gangwon-hongcheon',
        dongStations: {
          'hongcheon-eup': '홍천읍',
          'hwachon-myeon': '화촌면',
          'duchon-myeon': '두촌면',
          'naechon-myeon': '내촌면',
          'seoseok-myeon': '서석면',
          'yeonggwimi-myeon': '영귀미면',
          'bukbang-myeon': '북방면',
          'nae-myeon': '내면',
        },
      },
      hoengseong: {
        districtsname: '횡성',
        districtseng: 'gangwon-hoengseong',
        dongStations: {
          'hoengseong-eup': '횡성읍',
          'ucheon-myeon': '우천면',
          'anheung-myeon': '안흥면',
          'dunnae-myeon': '둔내면',
          'gapcheon-myeon': '갑천면',
          'cheongil-myeon': '청일면',
          'gonggeun-myeon': '공근면',
          'seowon-myeon': '서원면',
          'gangnim-myeon': '강림면',
        },
      },
      yeongwol: {
        districtsname: '영월',
        districtseng: 'gangwon-yeongwol',
        dongStations: {
          'yeongwol-eup': '영월읍',
          'sangdong-eup': '상동읍',
          'sansol-myeon': '산솔면',
          'gimsatgat-myeon': '김삿갓면',
          'buk-myeon': '북면',
          'hanbando-myeon': '한반도면',
          'jucheon-myeon': '주천면',
          'mureung-dowon-myeon': '무릉도원면',
        },
      },
      pyeongchang: {
        districtsname: '평창',
        districtseng: 'gangwon-pyeongchang',
        dongStations: {
          'pyeongchang-eup': '평창읍',
          'mitan-myeon': '미탄면',
          'bangnim-myeon': '방림면',
          'daehwa-myeon': '대화면',
          'bongpyeong-myeon': '봉평면',
          'yongpyeong-myeon': '용평면',
          'jinbu-myeon': '진부면',
          'daegwallyeong-myeon': '대관령면',
        },
      },
      jeongseon: {
        districtsname: '정선',
        districtseng: 'gangwon-jeongseon',
        dongStations: {
          'jeongseon-eup': '정선읍',
          'gohan-eup': '고한읍',
          'sabuk-eup': '사북읍',
          'sindong-eup': '신동읍',
          'bukpyeong-myeon': '북평면',
          'imgye-myeon': '임계면',
          'hwaam-myeon': '화암면',
          'yeoryang-myeon': '여량면',
        },
      },
      cheorwon: {
        districtsname: '철원',
        districtseng: 'gangwon-cheorwon',
        dongStations: {
          'cheorwon-eup': '철원읍',
          'gimhwa-eup': '김화읍',
          'galmal-eup': '갈말읍',
          'dongsong-eup': '동송읍',
          'geunnam-myeon': '근남면',
          'geunbuk-myeon': '근북면',
          'geundong-myeon': '근동면',
          'wondong-myeon': '원동면',
          'wonnam-myeon': '원남면',
          'imnam-myeon': '임남면',
        },
      },
      hwacheon: {
        districtsname: '화천',
        districtseng: 'gangwon-hwacheon',
        dongStations: {
          'hwacheon-eup': '화천읍',
          'gandong-myeon': '간동면',
          'hanam-myeon': '하남면',
          'sangseo-myeon': '상서면',
          'sanae-myeon': '사내면',
        },
      },
      yanggu: {
        districtsname: '양구',
        districtseng: 'gangwon-yanggu',
        dongStations: {
          'yanggu-eup': '양구읍',
          'gukto-jeongjungang-myeon': '국토정중앙면',
          'bangsan-myeon': '방산면',
          'haean-myeon': '해안면',
        },
      },
      inje: {
        districtsname: '인제',
        districtseng: 'gangwon-inje',
        dongStations: {
          'inje-eup': '인제읍',
          'girin-myeon': '기린면',
          'seohwa-myeon': '서화면',
          'sangnam-myeon': '상남면',
        },
      },
      goseong: {
        districtsname: '고성',
        districtseng: 'gangwon-goseong',
        dongStations: {
          'ganseong-eup': '간성읍',
          'geojin-eup': '거진읍',
          'hyeonnae-myeon': '현내면',
          'jukwang-myeon': '죽왕면',
          'toseong-myeon': '토성면',
          'sudong-myeon': '수동면',
          'yangyang-eup': '양양읍',
          'sonyang-myeon': '손양면',
          'hyeonbuk-myeon': '현북면',
          'hyeonnam-myeon': '현남면',
          'ganghyeon-myeon': '강현면',
        },
      },
    },
  },
  chungbuk: {
    regionName: '충북',
    regionEng: 'chungbuk',
    districts: {
      cheongju: {
        districtsname: '청주',
        districtseng: 'chungbuk-cheongju',
        dongStations: {
          'nangseong-myeon': '낭성면',
          'miwon-myeon': '미원면',
          'gadeok-myeon': '가덕면',
          'namil-myeon': '남일면',
          'munui-myeon': '문의면',
          'jungang-dong': '중앙동',
          'seongan-dong': '성안동',
          'tapdaeseong-dong': '탑대성동',
          'yeongun-dong': '영운동',
          'geumcheon-dong': '금천동',
          'yongdam-myeongam-sanseong-dong': '용담명암산성동',
          'yongam-dong': '용암동',
          'nami-myeon': '남이면',
          'hyeondo-myeon': '현도면',
          'sajik-dong': '사직동',
          'sachang-dong': '사창동',
          'mochung-dong': '모충동',
          'sannam-dong': '산남동',
          'bunpyeong-dong': '분평동',
          'sugok-dong': '수곡동',
          'seonghwa-gaesin-jungnim-dong': '성화개신죽림동',
          'osong-eup': '오송읍',
          'gangnae-myeon': '강내면',
          'oksan-myeon': '옥산면',
          'uncheon-sinbong-dong': '운천신봉동',
          'bokdae-dong': '복대동',
          'gagyeong-dong': '가경동',
          'bongmyeong-dong': '봉명동',
          'songjeong-dong': '송정동',
          'gangseo-dong': '강서동',
          'osong-station': '오송역',
          'ogeunjang-station': '오근장역',
          'cheongju-airport-station': '청주공항역',
        },
      },
      cheongwon: {
        districtsname: '청원',
        districtseng: 'chungbuk-cheongwon',
        dongStations: {
          'naesu-eup': '내수읍',
          'ochang-eup': '오창읍',
          'buki-myeon': '북이면',
          'uam-dong': '우암동',
          'naedeok-dong': '내덕동',
          'sacheon-dong': '사천동',
          'ogeunjang-dong': '오근장동',
        },
      },
      chungju: {
        districtsname: '충주',
        districtseng: 'chungbuk-chungju',
        dongStations: {
          'judeok-eup': '주덕읍',
          'salmi-myeon': '살미면',
          'suanbo-myeon': '수안보면',
          'daesowon-myeon': '대소원면',
          'sinni-myeon': '신니면',
          'noeun-myeon': '노은면',
          'angseong-myeon': '앙성면',
          'jungangtap-myeon': '중앙탑면',
          'geumga-myeon': '금가면',
          'dongnyang-myeon': '동량면',
          'sancheok-myeon': '산척면',
          'eomjeong-myeon': '엄정면',
          'sotae-myeon': '소태면',
          'chungin-dong': '충인동',
          'allim-dong': '안림동',
          'gyohyeon-dong': '교현동',
          'yongsan-dong': '용산동',
          'jihyeon-dong': '지현동',
          'munhwa-dong': '문화동',
          'hoam-jik-dong': '호암직동',
          'dalcheon-dong': '달천동',
          'bongbang-dong': '봉방동',
          'chilgeum-geumneung-dong': '칠금금릉동',
          'yeonsu-dong': '연수동',
          'yongtan-dong': '용탄동',
          'chungju-station': '충주역',
          'mokhaeng-station': '목행역',
          'samtan-station': '삼탄역',
        },
      },
      jecheon: {
        districtsname: '제천',
        districtseng: 'chungbuk-jecheon',
        dongStations: {
          'bongyang-eup': '봉양읍',
          'geumseong-myeon': '금성면',
          'cheongpung-myeon': '청풍면',
          'susan-myeon': '수산면',
          'deoksan-myeon': '덕산면',
          'hansu-myeon': '한수면',
          'baegun-myeon': '백운면',
          'songhak-myeon': '송학면',
          'gyo-dong': '교동',
          'uimji-dong': '의림지동',
          'namhyeon-dong': '남현동',
          'yeongseo-dong': '영서동',
          'yongdu-dong': '용두동',
          'sinbaek-dong': '신백동',
          'cheongjeon-dong': '청전동',
          'hwasan-dong': '화산동',
          'jecheon-station': '제천역',
          'uimji-station': '의림지역',
          'sillim-station': '신림역',
        },
      },
      boeun: {
        districtsname: '보은',
        districtseng: 'chungbuk-boeun',
        dongStations: {
          'boeun-eup': '보은읍',
          'songnisan-myeon': '속리산면',
          'jangan-myeon': '장안면',
          'maro-myeon': '마로면',
          'tanbu-myeon': '탄부면',
          'samseung-myeon': '삼승면',
          'suhan-myeon': '수한면',
          'hoenam-myeon': '회남면',
          'hoein-myeon': '회인면',
          'naebuk-myeon': '내북면',
          'sanoe-myeon': '산외면',
        },
      },
      okcheon: {
        districtsname: '옥천',
        districtseng: 'chungbuk-okcheon',
        dongStations: {
          'okcheon-eup': '옥천읍',
          'dongi-myeon': '동이면',
          'annam-myeon': '안남면',
          'annae-myeon': '안내면',
          'cheongseong-myeon': '청성면',
          'cheongsan-myeon': '청산면',
          'iwon-myeon': '이원면',
          'gunseo-myeon': '군서면',
          'gunbuk-myeon': '군북면',
          'okcheon-station': '옥천역',
          'iwon-station': '이원역',
        },
      },
      yeongdong: {
        districtsname: '영동',
        districtseng: 'chungbuk-yeongdong',
        dongStations: {
          'yeongdong-eup': '영동읍',
          'yongsan-myeon': '용산면',
          'hwanggan-myeon': '황간면',
          'chupungnyeong-myeon': '추풍령면',
          'maegok-myeon': '매곡면',
          'sangchon-myeon': '상촌면',
          'yanggang-myeon': '양강면',
          'yonghwa-myeon': '용화면',
          'haksan-myeon': '학산면',
          'yangsan-myeon': '양산면',
          'simcheon-myeon': '심천면',
          'yeongdong-station': '영동역',
        },
      },
      jeungpyeong: {
        districtsname: '증평',
        districtseng: 'chungbuk-jeungpyeong',
        dongStations: {
          'jeungpyeong-eup': '증평읍',
          'doan-myeon': '도안면',
        },
      },
      jincheon: {
        districtsname: '진천',
        districtseng: 'chungbuk-jincheon',
        dongStations: {
          'jincheon-eup': '진천읍',
          'deoksan-eup': '덕산읍',
          'chopyeong-myeon': '초평면',
          'munbaek-myeon': '문백면',
          'baegok-myeon': '백곡면',
          'iwol-myeon': '이월면',
          'gwanghyewon-myeon': '광혜원면',
        },
      },
      goesan: {
        districtsname: '괴산',
        districtseng: 'chungbuk-goesan',
        dongStations: {
          'goesan-eup': '괴산읍',
          'gammul-myeon': '감물면',
          'jangyeon-myeon': '장연면',
          'yeonpung-myeon': '연풍면',
          'chilseong-myeon': '칠성면',
          'mungwang-myeon': '문광면',
          'cheongcheon-myeon': '청천면',
          'cheongan-myeon': '청안면',
          'sari-myeon': '사리면',
          'sosu-myeon': '소수면',
          'buljeong-myeon': '불정면',
        },
      },
      eumseong: {
        districtsname: '음성',
        districtseng: 'chungbuk-eumseong',
        dongStations: {
          'eumseong-eup': '음성읍',
          'geumwang-eup': '금왕읍',
          'soi-myeon': '소이면',
          'wonnam-myeon': '원남면',
          'maengdong-myeon': '맹동면',
          'daeso-myeon': '대소면',
          'samseong-myeon': '삼성면',
          'saenggeuk-myeon': '생극면',
          'gamgok-myeon': '감곡면',
        },
      },
      danyang: {
        districtsname: '단양',
        districtseng: 'chungbuk-danyang',
        dongStations: {
          'danyang-eup': '단양읍',
          'maepo-eup': '매포읍',
          'daegang-myeon': '대강면',
          'gagok-myeon': '가곡면',
          'yeongchun-myeon': '영춘면',
          'eosangcheon-myeon': '어상천면',
          'jeokseong-myeon': '적성면',
          'danseong-myeon': '단성면',
          'danyang-station': '단양역',
          'danseong-station': '단성역',
          'dodam-station': '도담역',
        },
      },
    },
  },
  chungnam: {
    regionName: '충남',
    regionEng: 'chungnam',
    districts: {
      cheonan: {
        districtsname: '천안',
        districtseng: 'chungnam-cheonan',
        dongStations: {
          'mokcheon-eup': '목천읍',
          'pungse-myeon': '풍세면',
          'gwangdeok-myeon': '광덕면',
          'buk-myeon': '북면',
          'seongnam-myeon': '성남면',
          'susin-myeon': '수신면',
          'byeongcheon-myeon': '병천면',
          'dong-myeon': '동면',
          'jungang-dong': '중앙동',
          'munseong-dong': '문성동',
          'wonseong-dong': '원성동',
          'bongmyeong-dong': '봉명동',
          'ilbong-dong': '일봉동',
          'sinbang-dong': '신방동',
          'cheongnyong-dong': '청룡동',
          'sinan-dong': '신안동',
          'seonghwan-eup': '성환읍',
          'seonggeo-eup': '성거읍',
          'jiksan-eup': '직산읍',
          'ipjang-myeon': '입장면',
          'seongjeong-dong': '성정동',
          'ssangyong-dong': '쌍용동',
          'baekseok-dong': '백석동',
          'buldang-dong': '불당동',
          'buseong-dong': '부성동',
          'cheonan-station': '천안역',
          'ssangyong-station': '쌍용역',
          'bongmyeong-station': '봉명역',
          'dujeong-station': '두정역',
        },
      },
      gongju: {
        districtsname: '공주',
        districtseng: 'chungnam-gongju',
        dongStations: {
          'yugu-eup': '유구읍',
          'iin-myeon': '이인면',
          'tancheon-myeon': '탄천면',
          'gyeryong-myeon': '계룡면',
          'banpo-myeon': '반포면',
          'uidang-myeon': '의당면',
          'jeongan-myeon': '정안면',
          'useong-myeon': '우성면',
          'sagok-myeon': '사곡면',
          'sinpung-myeon': '신풍면',
          'junghak-dong': '중학동',
          'ungjin-dong': '웅진동',
          'geumhak-dong': '금학동',
          'okryong-dong': '옥룡동',
          'singwan-dong': '신관동',
          'wolsong-dong': '월송동',
        },
      },
      boryeong: {
        districtsname: '보령',
        districtseng: 'chungnam-boryeong',
        dongStations: {
          'ungcheon-eup': '웅천읍',
          'jupo-myeon': '주포면',
          'ocheon-myeon': '오천면',
          'cheonbuk-myeon': '천북면',
          'cheongso-myeon': '청소면',
          'cheongra-myeon': '청라면',
          'nampo-myeon': '남포면',
          'jusan-myeon': '주산면',
          'misan-myeon': '미산면',
          'seongju-myeon': '성주면',
          'jugyo-myeon': '주교면',
          'daecheon-dong': '대천동',
          'daecheon-station': '대천역',
        },
      },
      asan: {
        districtsname: '아산',
        districtseng: 'chungnam-asan',
        dongStations: {
          'yeomchi-eup': '염치읍',
          'baebang-eup': '배방읍',
          'songak-myeon': '송악면',
          'tangjeong-myeon': '탕정면',
          'eumbong-myeon': '음봉면',
          'dunpo-myeon': '둔포면',
          'yeongin-myeon': '영인면',
          'inju-myeon': '인주면',
          'seonjang-myeon': '선장면',
          'dogo-myeon': '도고면',
          'sinchang-myeon': '신창면',
          'onyang-dong': '온양동',
          'cheonan-asan-station': '천안아산역',
          'onyang-oncheon-station': '온양온천역',
          'baebang-station': '배방역',
          'tangjeong-station': '탕정역',
          'sinchang-station': '신창역',
        },
      },
      seosan: {
        districtsname: '서산',
        districtseng: 'chungnam-seosan',
        dongStations: {
          'daesan-eup': '대산읍',
          'inji-myeon': '인지면',
          'buseok-myeon': '부석면',
          'palbong-myeon': '팔봉면',
          'jigok-myeon': '지곡면',
          'seongyeon-myeon': '성연면',
          'eumam-myeon': '음암면',
          'unsan-myeon': '운산면',
          'haemi-myeon': '해미면',
          'gobuk-myeon': '고북면',
          'buchun-dong': '부춘동',
          'dongmun-dong': '동문동',
          'seoseok-dong': '수석동',
          'seongnam-dong': '석남동',
        },
      },
      nonsan: {
        districtsname: '논산',
        districtseng: 'chungnam-nonsan',
        dongStations: {
          'ganggyeong-eup': '강경읍',
          'yeonmu-eup': '연무읍',
          'seongdong-myeon': '성동면',
          'gwangseok-myeon': '광석면',
          'noseong-myeon': '노성면',
          'sangwol-myeon': '상월면',
          'bujeok-myeon': '부적면',
          'yeonsan-myeon': '연산면',
          'beolgok-myeon': '벌곡면',
          'yangchon-myeon': '양촌면',
          'gayagok-myeon': '가야곡면',
          'eunjin-myeon': '은진면',
          'chaeun-myeon': '채운면',
          'chwiam-dong': '취암동',
          'buchang-dong': '부창동',
          'nonsan-station': '논산역',
          'yeonmudae-station': '연무대역',
        },
      },
      gyeryong: {
        districtsname: '계룡',
        districtseng: 'chungnam-gyeryong',
        dongStations: {
          'duma-myeon': '두마면',
          'eomsa-myeon': '엄사면',
          'sindoan-myeon': '신도안면',
          'geumam-dong': '금암동',
          'gyeryong-station': '계룡역',
        },
      },
      dangjin: {
        districtsname: '당진',
        districtseng: 'chungnam-dangjin',
        dongStations: {
          'hapdeok-eup': '합덕읍',
          'songak-eup': '송악읍',
          'godae-myeon': '고대면',
          'seongmun-myeon': '석문면',
          'daehoji-myeon': '대호지면',
          'jeongmi-myeon': '정미면',
          'myeoncheon-myeon': '면천면',
          'sunseong-myeon': '순성면',
          'ugang-myeon': '우강면',
          'sinpyeong-myeon': '신평면',
          'songsan-myeon': '송산면',
          'dangjin-dong': '당진동',
          'hapdeok-station': '합덕역',
          'dangjin-station': '당진역',
        },
      },
      geumsan: {
        districtsname: '금산',
        districtseng: 'chungnam-geumsan',
        dongStations: {
          'geumsan-eup': '금산읍',
          'geumseong-myeon': '금성면',
          'jewon-myeon': '제원면',
          'buri-myeon': '부리면',
          'gunbuk-myeon': '군북면',
          'namil-myeon': '남일면',
          'nami-myeon': '남이면',
          'jinsan-myeon': '진산면',
          'boksu-myeon': '복수면',
          'chubu-myeon': '추부면',
        },
      },
      buyeo: {
        districtsname: '부여',
        districtseng: 'chungnam-buyeo',
        dongStations: {
          'buyeo-eup': '부여읍',
          'gyuam-myeon': '규암면',
          'eunsan-myeon': '은산면',
          'oesan-myeon': '외산면',
          'naesan-myeon': '내산면',
          'guryong-myeon': '구룡면',
          'hongsan-myeon': '홍산면',
          'oksan-myeon': '옥산면',
          'nam-myeon': '남면',
          'chunghwa-myeon': '충화면',
          'yanghwa-myeon': '양화면',
          'imcheon-myeon': '임천면',
          'jangam-myeon': '장암면',
          'sedo-myeon': '세도면',
          'seokseong-myeon': '석성면',
          'chochon-myeon': '초촌면',
        },
      },
      seocheon: {
        districtsname: '서천',
        districtseng: 'chungnam-seocheon',
        dongStations: {
          'janghang-eup': '장항읍',
          'seocheon-eup': '서천읍',
          'maseo-myeon': '마서면',
          'hwayang-myeon': '화양면',
          'gisan-myeon': '기산면',
          'hansan-myeon': '한산면',
          'masan-myeon': '마산면',
          'sicho-myeon': '시초면',
          'munsan-myeon': '문산면',
          'pangyo-myeon': '판교면',
          'jongcheon-myeon': '종천면',
          'biin-myeon': '비인면',
          'seo-myeon': '서면',
          'seocheon-station': '서천역',
        },
      },
      cheongyang: {
        districtsname: '청양',
        districtseng: 'chungnam-cheongyang',
        dongStations: {
          'cheongyang-eup': '청양읍',
          'ungok-myeon': '운곡면',
          'daechi-myeon': '대치면',
          'jeongsan-myeon': '정산면',
          'mok-myeon': '목면',
          'cheongnam-myeon': '청남면',
          'jangpyeong-myeon': '장평면',
          'namyang-myeon': '남양면',
          'haseong-myeon': '화성면',
          'bibong-myeon': '비봉면',
        },
      },
      hongseong: {
        districtsname: '홍성',
        districtseng: 'chungnam-hongseong',
        dongStations: {
          'hongseong-eup': '홍성읍',
          'gwangcheon-eup': '광천읍',
          'hongbuk-eup': '홍북읍',
          'geumma-myeon': '금마면',
          'hongdong-myeon': '홍동면',
          'janggok-myeon': '장곡면',
          'eunha-myeon': '은하면',
          'gyeolseong-myeon': '결성면',
          'seobu-myeon': '서부면',
          'galsan-myeon': '갈산면',
          'guhang-myeon': '구항면',
          'hongseong-station': '홍성역',
        },
      },
      yesan: {
        districtsname: '예산',
        districtseng: 'chungnam-yesan',
        dongStations: {
          'yesan-eup': '예산읍',
          'sapgyo-eup': '삽교읍',
          'daesul-myeon': '대술면',
          'sinyang-myeon': '신양면',
          'gwangsii-myeon': '광시면',
          'daeheung-myeon': '대흥면',
          'eungbong-myeon': '응봉면',
          'deoksan-myeon': '덕산면',
          'bongsan-myeon': '봉산면',
          'godeok-myeon': '고덕면',
          'sinam-myeon': '신암면',
          'oga-myeon': '오가면',
          'yesan-station': '예산역',
        },
      },
      taean: {
        districtsname: '태안',
        districtseng: 'chungnam-taean',
        dongStations: {
          'taean-eup': '태안읍',
          'anmyeon-eup': '안면읍',
          'gonam-myeon': '고남면',
          'geunheung-myeon': '근흥면',
          'sowon-myeon': '소원면',
          'wonbuk-myeon': '원북면',
          'iwon-myeon': '이원면',
        },
      },
    },
  },
  jeonbuk: {
    regionName: '전북',
    regionEng: 'jeonbuk',
    districts: {
      jeonju: {
        districtsname: '전주',
        districtseng: 'jeonbuk-jeonju',
        dongStations: {
          'jungang-dong': '중앙동',
          'pungnam-dong': '풍남동',
          'nosong-dong': '노송동',
          'wansan-dong': '완산동',
          'dongseohak-dong': '동서학동',
          'seoseohak-dong': '서서학동',
          'junghwasan-dong': '중화산동',
          'seosin-dong': '서신동',
          'pyeonghwa-dong': '평화동',
          'samcheon-dong': '삼천동',
          'hyoja-dong': '효자동',
          'jinbuk-dong': '진북동',
          'inhu-dong': '인후동',
          'deokjin-dong': '덕진동',
          'geumam-dong': '금암동',
          'palbok-dong': '팔복동',
          'ua-dong': '우아동',
          'hoseong-dong': '호성동',
          'songcheon-dong': '송천동',
          'jochon-dong': '조촌동',
          'yeoui-dong': '여의동',
          'hyeoksin-dong': '혁신동',
          'jeonju-station': '전주역',
        },
      },
      gunsan: {
        districtsname: '군산',
        districtseng: 'jeonbuk-gunsan',
        dongStations: {
          'okgu-eup': '옥구읍',
          'oksan-myeon': '옥산면',
          'hoehyon-myeon': '회현면',
          'impi-myeon': '임피면',
          'seosu-myeon': '서수면',
          'daeya-myeon': '대야면',
          'gaejeong-myeon': '개정면',
          'seongsan-myeon': '성산면',
          'napo-myeon': '나포면',
          'okdo-myeon': '옥도면',
          'okseo-myeon': '옥서면',
          'haesin-dong': '해신동',
          'wolmyeong-dong': '월명동',
          'sinpung-dong': '신풍동',
          'samhak-dong': '삼학동',
          'heungnam-dong': '흥남동',
          'gyeongam-dong': '경암동',
          'guam-dong': '구암동',
          'gaejeong-dong': '개정동',
          'susong-dong': '수송동',
          'naun-dong': '나운동',
          'soryong-dong': '소룡동',
          'miseong-dong': '미성동',
          'gunsan-station': '군산역',
        },
      },
      iksan: {
        districtsname: '익산',
        districtseng: 'jeonbuk-iksan',
        dongStations: {
          'hamyeol-eup': '함열읍',
          'osan-myeon': '오산면',
          'hwangdeung-myeon': '황등면',
          'hamra-myeon': '함라면',
          'ungpo-myeon': '웅포면',
          'seongdang-myeon': '성당면',
          'yongan-myeon': '용안면',
          'nangsan-myeon': '낭산면',
          'mangseong-myeon': '망성면',
          'yeosan-myeon': '여산면',
          'geumma-myeon': '금마면',
          'wanggung-myeon': '왕궁면',
          'chunpo-myeon': '춘포면',
          'samgi-myeon': '삼기면',
          'yongdong-myeon': '용동면',
          'inhwa-dong': '인화동',
          'dongsan-dong': '동산동',
          'ma-dong': '마동',
          'namjung-dong': '남중동',
          'mohyeon-dong': '모현동',
          'songhak-dong': '송학동',
          'yeongdeung-dong': '영등동',
          'eoyang-dong': '어양동',
          'sin-dong': '신동',
          'palbong-dong': '팔봉동',
          'samseong-dong': '삼성동',
          'iksan-station': '익산역',
          'hamyeol-station': '함열역',
          'geumma-station': '금마역',
        },
      },
      jeongeup: {
        districtsname: '정읍',
        districtseng: 'jeonbuk-jeongeup',
        dongStations: {
          'sintaein-eup': '신태인읍',
          'buk-myeon': '북면',
          'ibam-myeon': '입암면',
          'soseong-myeon': '소성면',
          'gobu-myeon': '고부면',
          'yeongwon-myeon': '영원면',
          'deokcheon-myeon': '덕천면',
          'ipyeong-myeon': '이평면',
          'jeongu-myeon': '정우면',
          'taein-myeon': '태인면',
          'gamgok-myeon': '감곡면',
          'ongdong-myeon': '옹동면',
          'chilbo-myeon': '칠보면',
          'sannae-myeon': '산내면',
          'sanoe-myeon': '산외면',
          'suseong-dong': '수성동',
          'jangmyeong-dong': '장명동',
          'naejangsang-dong': '내장상동',
          'sigi-dong': '시기동',
          'chosan-dong': '초산동',
          'yeonji-dong': '연지동',
          'nongso-dong': '농소동',
          'sanggyo-dong': '상교동',
          'jeongeup-station': '정읍역',
        },
      },
      namwon: {
        districtsname: '남원',
        districtseng: 'jeonbuk-namwon',
        dongStations: {
          'unbong-eup': '운봉읍',
          'jucheon-myeon': '주천면',
          'suji-myeon': '수지면',
          'songdong-myeon': '송동면',
          'jusaeng-myeon': '주생면',
          'geumji-myeon': '금지면',
          'daegang-myeon': '대강면',
          'daesan-myeon': '대산면',
          'samae-myeon': '사매면',
          'deokgwa-myeon': '덕과면',
          'bojeol-myeon': '보절면',
          'sandong-myeon': '산동면',
          'ibaek-myeon': '이백면',
          'ayeong-myeon': '아영면',
          'inwol-myeon': '인월면',
          'dongchung-dong': '동충동',
          'jukhang-dong': '죽항동',
          'noam-dong': '노암동',
          'geum-dong': '금동',
          'wangjeong-dong': '왕정동',
          'hyanggyo-dong': '향교동',
          'dotong-dong': '도통동',
          'namwon-station': '남원역',
        },
      },
      gimje: {
        districtsname: '김제',
        districtseng: 'jeonbuk-gimje',
        dongStations: {
          'mangyeong-eup': '만경읍',
          'juksan-myeon': '죽산면',
          'baeksan-myeon': '백산면',
          'yongji-myeon': '용지면',
          'baekgu-myeon': '백구면',
          'buryang-myeon': '부량면',
          'gongdeok-myeon': '공덕면',
          'cheongha-myeon': '청하면',
          'seongdeok-myeon': '성덕면',
          'jinbong-myeon': '진봉면',
          'geumgu-myeon': '금구면',
          'bongnam-myeon': '봉남면',
          'hwangsan-myeon': '황산면',
          'geumsan-myeon': '금산면',
          'gwanghwal-myeon': '광활면',
          'yochon-dong': '요촌동',
          'geomsan-dong': '검산동',
          'gyowol-dong': '교월동',
          'gimje-station': '김제역',
        },
      },
      wanju: {
        districtsname: '완주',
        districtseng: 'jeonbuk-wanju',
        dongStations: {
          'samrye-eup': '삼례읍',
          'bongdong-eup': '봉동읍',
          'yongjin-eup': '용진읍',
          'sanggwan-myeon': '상관면',
          'iseo-myeon': '이서면',
          'soyang-myeon': '소양면',
          'gu-i-myeon': '구이면',
          'gosan-myeon': '고산면',
          'bibong-myeon': '비봉면',
          'unju-myeon': '운주면',
          'hwasan-myeon': '화산면',
          'dongsang-myeon': '동상면',
          'gyeongcheon-myeon': '경천면',
          'bongdong-station': '봉동역',
        },
      },
      jinan: {
        districtsname: '진안',
        districtseng: 'jeonbuk-jinan',
        dongStations: {
          'jinan-eup': '진안읍',
          'yongdam-myeon': '용담면',
          'ancheon-myeon': '안천면',
          'donghyang-myeon': '동향면',
          'sangjeon-myeon': '상전면',
          'baegun-myeon': '백운면',
          'seongsu-myeon': '성수면',
          'maryeong-myeon': '마령면',
          'bugwi-myeon': '부귀면',
          'jeongcheon-myeon': '정천면',
        },
      },
      muju: {
        districtsname: '무주',
        districtseng: 'jeonbuk-muju',
        dongStations: {
          'muju-eup': '무주읍',
          'mupung-myeon': '무풍면',
          'seolcheon-myeon': '설천면',
          'jeoksang-myeon': '적상면',
          'anseong-myeon': '안성면',
          'bunam-myeon': '부남면',
        },
      },
      jangsu: {
        districtsname: '장수',
        districtseng: 'jeonbuk-jangsu',
        dongStations: {
          'jangsu-eup': '장수읍',
          'sanseo-myeon': '산서면',
          'beonam-myeon': '번암면',
          'janggye-myeon': '장계면',
          'cheoncheon-myeon': '천천면',
          'gyenam-myeon': '계남면',
          'gyebuk-myeon': '계북면',
        },
      },
      imsil: {
        districtsname: '임실',
        districtseng: 'jeonbuk-imsil',
        dongStations: {
          'imsil-eup': '임실읍',
          'cheongung-myeon': '청웅면',
          'unan-myeon': '운암면',
          'sinpyeong-myeon': '신평면',
          'osu-myeon': '오수면',
          'sindeok-myeon': '신덕면',
          'samgye-myeon': '삼계면',
          'gwanchon-myeon': '관촌면',
          'gangjin-myeon': '강진면',
          'deokchi-myeon': '덕치면',
          'jisa-myeon': '지사면',
        },
      },
      sunchang: {
        districtsname: '순창',
        districtseng: 'jeonbuk-sunchang',
        dongStations: {
          'sunchang-eup': '순창읍',
          'ingye-myeon': '인계면',
          'donggye-myeon': '동계면',
          'pungsan-myeon': '풍산면',
          'geumgwa-myeon': '금과면',
          'paldeok-myeon': '팔덕면',
          'ssangchi-myeon': '쌍치면',
          'bokheung-myeon': '복흥면',
          'jeokseong-myeon': '적성면',
          'yudeung-myeon': '유등면',
          'gurim-myeon': '구림면',
        },
      },
      gochang: {
        districtsname: '고창',
        districtseng: 'jeonbuk-gochang',
        dongStations: {
          'gochang-eup': '고창읍',
          'gosu-myeon': '고수면',
          'asan-myeon': '아산면',
          'mujang-myeon': '무장면',
          'gongeum-myeon': '공음면',
          'sangha-myeon': '상하면',
          'haeri-myeon': '해리면',
          'seongsong-myeon': '성송면',
          'simwon-myeon': '심원면',
          'heungdeok-myeon': '흥덕면',
          'seongnae-myeon': '성내면',
          'sillim-myeon': '신림면',
          'buan-myeon': '부안면',
        },
      },
      buan: {
        districtsname: '부안',
        districtseng: 'jeonbuk-buan',
        dongStations: {
          'buan-eup': '부안읍',
          'jusan-myeon': '주산면',
          'dongjin-myeon': '동진면',
          'haengan-myeon': '행안면',
          'gyehwa-myeon': '계화면',
          'boan-myeon': '보안면',
          'byeonsan-myeon': '변산면',
          'jinseo-myeon': '진서면',
          'sangseo-myeon': '상서면',
          'haseo-myeon': '하서면',
          'julpo-myeon': '줄포면',
          'wido-myeon': '위도면',
        },
      },
    },
  },
  jeonnam: {
    regionName: '전남',
    regionEng: 'jeonnam',
    districts: {
      mokpo: {
        districtsname: '목포',
        districtseng: 'jeonnam-mokpo',
        dongStations: {
          'yongdang-dong': '용당동',
          'yeon-dong': '연동',
          'sanjeong-dong': '산정동',
          'yeonsan-dong': '연산동',
          'wonsan-dong': '원산동',
          'daeseong-dong': '대성동',
          'mogwon-dong': '목원동',
          'dongmyeong-dong': '동명동',
          'samhak-dong': '삼학동',
          'manho-dong': '만호동',
          'yudal-dong': '유달동',
          'jukgyo-dong': '죽교동',
          'bukhang-dong': '북항동',
          'yonghae-dong': '용해동',
          'iro-dong': '이로동',
          'sang-dong': '상동',
          'hadang-dong': '하당동',
          'sinheung-dong': '신흥동',
          'samhyang-dong': '삼향동',
          'ogam-dong': '옥암동',
          'buheung-dong': '부흥동',
          'buju-dong': '부주동',
          'mokpo-station': '목포역',
        },
      },
      yeosu: {
        districtsname: '여수',
        districtseng: 'jeonnam-yeosu',
        dongStations: {
          'dolsan-eup': '돌산읍',
          'sora-myeon': '소라면',
          'yulchon-myeon': '율촌면',
          'hwayang-myeon': '화양면',
          'nam-myeon': '남면',
          'hwajeong-myeon': '화정면',
          'samsan-myeon': '삼산면',
          'dongmun-dong': '동문동',
          'hallyeo-dong': '한려동',
          'jungang-dong': '중앙동',
          'chungmu-dong': '충무동',
          'gwangnim-dong': '광림동',
          'seogang-dong': '서강동',
          'daegyo-dong': '대교동',
          'guk-dong': '국동',
          'wolho-dong': '월호동',
          'yeoseo-dong': '여서동',
          'munsu-dong': '문수동',
          'mipyeong-dong': '미평동',
          'dundeok-dong': '둔덕동',
          'mandeok-dong': '만덕동',
          'ssangbong-dong': '쌍봉동',
          'sijeon-dong': '시전동',
          'yeocheon-dong': '여천동',
          'jusam-dong': '주삼동',
          'samil-dong': '삼일동',
          'myodo-dong': '묘도동',
          'yeosu-expo-station': '여수엑스포역',
          'yeosu-city-hall-station': '여수시청역',
        },
      },
      suncheon: {
        districtsname: '순천',
        districtseng: 'jeonnam-suncheon',
        dongStations: {
          'seungju-eup': '승주읍',
          'haeryong-myeon': '해룡면',
          'seo-myeon': '서면',
          'hwangjeon-myeon': '황전면',
          'woldeung-myeon': '월등면',
          'juam-myeon': '주암면',
          'songgwang-myeon': '송광면',
          'oeseo-myeon': '외서면',
          'nagan-myeon': '낙안면',
          'byeoryang-myeon': '별량면',
          'sangsa-myeon': '상사면',
          'hyang-dong': '향동',
          'maegok-dong': '매곡동',
          'samsan-dong': '삼산동',
          'jogok-dong': '조곡동',
          'deokyeon-dong': '덕연동',
          'pungdeok-dong': '풍덕동',
          'namje-dong': '남제동',
          'jeojeon-dong': '저전동',
          'jangcheon-dong': '장천동',
          'dosa-dong': '도사동',
          'wangjo-dong': '왕조동',
          'suncheon-station': '순천역',
        },
      },
      naju: {
        districtsname: '나주',
        districtseng: 'jeonnam-naju',
        dongStations: {
          'nampyeong-eup': '남평읍',
          'seji-myeon': '세지면',
          'wanggok-myeon': '왕곡면',
          'bannam-myeon': '반남면',
          'gongsan-myeon': '공산면',
          'donggang-myeon': '동강면',
          'dasi-myeon': '다시면',
          'munpyeong-myeon': '문평면',
          'noan-myeon': '노안면',
          'geumcheon-myeon': '금천면',
          'sanpo-myeon': '산포면',
          'dado-myeon': '다도면',
          'bonghwang-myeon': '봉황면',
          'songwol-dong': '송월동',
          'yeonggang-dong': '영강동',
          'geumnam-dong': '금남동',
          'seongbuk-dong': '성북동',
          'yeongsan-dong': '영산동',
          'ichang-dong': '이창동',
          'bitgaram-dong': '빛가람동',
          'naju-station': '나주역',
        },
      },
      gwangyang: {
        districtsname: '광양',
        districtseng: 'jeonnam-gwangyang',
        dongStations: {
          'gwangyang-eup': '광양읍',
          'bonggang-myeon': '봉강면',
          'okryong-myeon': '옥룡면',
          'okgok-myeon': '옥곡면',
          'jinsang-myeon': '진상면',
          'jinwol-myeon': '진월면',
          'daap-myeon': '다압면',
          'golyak-dong': '골약동',
          'jungma-dong': '중마동',
          'gwangyeong-dong': '광영동',
          'geumho-dong': '금호동',
          'taein-dong': '태인동',
          'gwangyang-station': '광양역',
        },
      },
      damyang: {
        districtsname: '담양',
        districtseng: 'jeonnam-damyang',
        dongStations: {
          'damyang-eup': '담양읍',
          'bongsan-myeon': '봉산면',
          'goseo-myeon': '고서면',
          'gasamunhak-myeon': '가사문학면',
          'changpyeong-myeon': '창평면',
          'daedeok-myeon': '대덕면',
          'mujeong-myeon': '무정면',
          'geumseong-myeon': '금성면',
          'yong-myeon': '용면',
          'wolsan-myeon': '월산면',
          'subuk-myeon': '수북면',
          'daejeon-myeon': '대전면',
        },
      },
      gokseong: {
        districtsname: '곡성',
        districtseng: 'jeonnam-gokseong',
        dongStations: {
          'gokseong-eup': '곡성읍',
          'ogok-myeon': '오곡면',
          'samgi-myeon': '삼기면',
          'seokgok-myeon': '석곡면',
          'moksadong-myeon': '목사동면',
          'jukgok-myeon': '죽곡면',
          'godal-myeon': '고달면',
          'okgwa-myeon': '옥과면',
          'ip-myeon': '입면',
          'gyeom-myeon': '겸면',
          'osan-myeon': '오산면',
          'gokseong-station': '곡성역',
        },
      },
      gurye: {
        districtsname: '구례',
        districtseng: 'jeonnam-gurye',
        dongStations: {
          'gurye-eup': '구례읍',
          'muncheok-myeon': '문척면',
          'ganjeon-myeon': '간전면',
          'toji-myeon': '토지면',
          'masan-myeon': '마산면',
          'gwang-ui-myeon': '광의면',
          'yongbang-myeon': '용방면',
          'sandong-myeon': '산동면',
        },
      },
      goheung: {
        districtsname: '고흥',
        districtseng: 'jeonnam-goheung',
        dongStations: {
          'goheung-eup': '고흥읍',
          'doyang-eup': '도양읍',
          'pungyang-myeon': '풍양면',
          'dodeok-myeon': '도덕면',
          'geumsan-myeon': '금산면',
          'dohwa-myeon': '도화면',
          'podu-myeon': '포두면',
          'bongrae-myeon': '봉래면',
          'jeomam-myeon': '점암면',
          'gwayeok-myeon': '과역면',
          'namyang-myeon': '남양면',
          'daeseo-myeon': '대서면',
          'duwon-myeon': '두원면',
          'yeongnam-myeon': '영남면',
          'dongil-myeon': '동일면',
        },
      },
      boseong: {
        districtsname: '보성',
        districtseng: 'jeonnam-boseong',
        dongStations: {
          'boseong-eup': '보성읍',
          'beolgyo-eup': '벌교읍',
          'nodong-myeon': '노동면',
          'miryeok-myeon': '미력면',
          'gyeombaek-myeon': '겸백면',
          'yeoreo-myeon': '율어면',
          'bongnae-myeon': '복내면',
          'mundeok-myeon': '문덕면',
          'joseong-myeon': '조성면',
          'deungnyang-myeon': '득량면',
          'hoecheon-myeon': '회천면',
          'ungchi-myeon': '웅치면',
        },
      },
      hwasun: {
        districtsname: '화순',
        districtseng: 'jeonnam-hwasun',
        dongStations: {
          'hwasun-eup': '화순읍',
          'hancheon-myeon': '한천면',
          'chunyang-myeon': '춘양면',
          'cheongpung-myeon': '청풍면',
          'iyang-myeon': '이양면',
          'neungju-myeon': '능주면',
          'dogok-myeon': '도곡면',
          'doam-myeon': '도암면',
          'iseo-myeon': '이서면',
          'baega-myeon': '백아면',
          'dongbok-myeon': '동복면',
          'sapyeong-myeon': '사평면',
          'dong-myeon': '동면',
        },
      },
      jangheung: {
        districtsname: '장흥',
        districtseng: 'jeonnam-jangheung',
        dongStations: {
          'jangheung-eup': '장흥읍',
          'gwansan-eup': '관산읍',
          'daedeok-eup': '대덕읍',
          'yongsan-myeon': '용산면',
          'anyang-myeon': '안양면',
          'jangdong-myeon': '장동면',
          'jangpyeong-myeon': '장평면',
          'yuchi-myeon': '유치면',
          'busan-myeon': '부산면',
          'hoejin-myeon': '회진면',
        },
      },
      gangjin: {
        districtsname: '강진',
        districtseng: 'jeonnam-gangjin',
        dongStations: {
          'gangjin-eup': '강진읍',
          'gundong-myeon': '군동면',
          'chillyang-myeon': '칠량면',
          'daegu-myeon': '대구면',
          'sinjeon-myeon': '신전면',
          'seongjeon-myeon': '성전면',
          'jakcheon-myeon': '작천면',
          'byeongyeong-myeon': '병영면',
          'omcheon-myeon': '옴천면',
          'maryang-myeon': '마량면',
        },
      },
      haenam: {
        districtsname: '해남',
        districtseng: 'jeonnam-haenam',
        dongStations: {
          'haenam-eup': '해남읍',
          'hwasan-myeon': '화산면',
          'hyeonsan-myeon': '현산면',
          'songji-myeon': '송지면',
          'bukpyeong-myeon': '북평면',
          'bugil-myeon': '북일면',
          'okcheon-myeon': '옥천면',
          'gyegok-myeon': '계곡면',
          'hwangsan-myeon': '황산면',
          'sani-myeon': '산이면',
          'munnae-myeon': '문내면',
          'hawon-myeon': '화원면',
        },
      },
      yeongam: {
        districtsname: '영암',
        districtseng: 'jeonnam-yeongam',
        dongStations: {
          'yeongam-eup': '영암읍',
          'samho-eup': '삼호읍',
          'deokjin-myeon': '덕진면',
          'geumjeong-myeon': '금정면',
          'sinbuk-myeon': '신북면',
          'sijong-myeon': '시종면',
          'dopo-myeon': '도포면',
          'gunseo-myeon': '군서면',
          'seoho-myeon': '서호면',
          'haksan-myeon': '학산면',
          'miam-myeon': '미암면',
        },
      },
      muan: {
        districtsname: '무안',
        districtseng: 'jeonnam-muan',
        dongStations: {
          'muan-eup': '무안읍',
          'illo-eup': '일로읍',
          'samhyang-eup': '삼향읍',
          'mongtan-myeon': '몽탄면',
          'cheonggye-myeon': '청계면',
          'hyeongyeong-myeon': '현경면',
          'mangun-myeon': '망운면',
          'haeje-myeon': '해제면',
          'unnan-myeon': '운남면',
        },
      },
      hampyeong: {
        districtsname: '함평',
        districtseng: 'jeonnam-hampyeong',
        dongStations: {
          'hampyeong-eup': '함평읍',
          'sonbul-myeon': '손불면',
          'singwang-myeon': '신광면',
          'hakgyo-myeon': '학교면',
          'eomda-myeon': '엄다면',
          'daedong-myeon': '대동면',
          'nasan-myeon': '나산면',
          'haebo-myeon': '해보면',
          'worya-myeon': '월야면',
        },
      },
      yeonggwang: {
        districtsname: '영광',
        districtseng: 'jeonnam-yeonggwang',
        dongStations: {
          'yeonggwang-eup': '영광읍',
          'baeksu-eup': '백수읍',
          'hongnong-eup': '홍농읍',
          'daema-myeon': '대마면',
          'myoryang-myeon': '묘량면',
          'bulgap-myeon': '불갑면',
          'gunnam-myeon': '군남면',
          'yeomsan-myeon': '염산면',
          'beopseong-myeon': '법성면',
          'nagwol-myeon': '낙월면',
        },
      },
      jangseong: {
        districtsname: '장성',
        districtseng: 'jeonnam-jangseong',
        dongStations: {
          'jangseong-eup': '장성읍',
          'jinwon-myeon': '진원면',
          'donghwa-myeon': '동화면',
          'samseo-myeon': '삼서면',
          'samgye-myeon': '삼계면',
          'hwangryong-myeon': '황룡면',
          'seosam-myeon': '서삼면',
          'buki-myeon': '북이면',
          'bukha-myeon': '북하면',
        },
      },
      wando: {
        districtsname: '완도',
        districtseng: 'jeonnam-wando',
        dongStations: {
          'wando-eup': '완도읍',
          'geumil-eup': '금일읍',
          'nohwa-eup': '노화읍',
          'gunoe-myeon': '군외면',
          'sinji-myeon': '신지면',
          'gogeum-myeon': '고금면',
          'yaksan-myeon': '약산면',
          'cheongsan-myeon': '청산면',
          'soan-myeon': '소안면',
          'geumdang-myeon': '금당면',
          'bogil-myeon': '보길면',
          'saengil-myeon': '생일면',
        },
      },
      jindo: {
        districtsname: '진도',
        districtseng: 'jeonnam-jindo',
        dongStations: {
          'jindo-eup': '진도읍',
          'gunnae-myeon': '군내면',
          'gogun-myeon': '고군면',
          'uisin-myeon': '의신면',
          'imhoe-myeon': '임회면',
          'jisan-myeon': '지산면',
          'jodo-myeon': '조도면',
        },
      },
      sinan: {
        districtsname: '신안',
        districtseng: 'jeonnam-sinan',
        dongStations: {
          'jido-eup': '지도읍',
          'aphae-eup': '압해읍',
          'jeungdo-myeon': '증도면',
          'imja-myeon': '임자면',
          'jaeun-myeon': '자은면',
          'bigeum-myeon': '비금면',
          'docho-myeon': '도초면',
          'heuksan-myeon': '흑산면',
          'haui-myeon': '하의면',
          'sinui-myeon': '신의면',
          'jangsan-myeon': '장산면',
          'anjoa-myeon': '안좌면',
          'palgeum-myeon': '팔금면',
          'amtae-myeon': '암태면',
        },
      },
    },
  },
  gyeongbuk: {
    regionName: '경북',
    regionEng: 'gyeongbuk',
    districts: {
      pohang: {
        districtsname: '포항',
        districtseng: 'gyeongbuk-pohang',
        dongStations: {
          'guryongpo-eup': '구룡포읍',
          'yeonil-eup': '연일읍',
          'ocheon-eup': '오천읍',
          'daesong-myeon': '대송면',
          'donghae-myeon': '동해면',
          'janggi-myeon': '장기면',
          'homigot-myeon': '호미곶면',
          'sangdae-dong': '상대동',
          'haedo-dong': '해도동',
          'songdo-dong': '송도동',
          'cheongnim-dong': '청림동',
          'jecheol-dong': '제철동',
          'hyogok-dong': '효곡동',
          'daei-dong': '대이동',
          'heunghae-eup': '흥해읍',
          'singwang-myeon': '신광면',
          'cheongha-myeon': '청하면',
          'songra-myeon': '송라면',
          'gigye-myeon': '기계면',
          'jukjang-myeon': '죽장면',
          'gibuk-myeon': '기북면',
          'jungang-dong': '중앙동',
          'yanghak-dong': '양학동',
          'jukdo-dong': '죽도동',
          'yongheung-dong': '용흥동',
          'uchang-dong': '우창동',
          'duho-dong': '두호동',
          'jangnyang-dong': '장량동',
          'hwanyeo-dong': '환여동',
          'pohang-station': '포항역',
          'guryongpo-station': '구룡포역',
          'ocheon-station': '오천역',
          'jukdo-station': '죽도역',
        },
      },
      gyeongju: {
        districtsname: '경주',
        districtseng: 'gyeongbuk-gyeongju',
        dongStations: {
          'gampo-eup': '감포읍',
          'angan-eup': '안강읍',
          'geoncheon-eup': '건천읍',
          'oedong-eup': '외동읍',
          'munmudaewang-myeon': '문무대왕면',
          'yangnam-myeon': '양남면',
          'naenam-myeon': '내남면',
          'sannae-myeon': '산내면',
          'seo-myeon': '서면',
          'hyeongok-myeon': '현곡면',
          'gangdong-myeon': '강동면',
          'cheonbuk-myeon': '천북면',
          'jungbu-dong': '중부동',
          'hwang-o-dong': '황오동',
          'seonggeon-dong': '성건동',
          'hwangnam-dong': '황남동',
          'seondo-dong': '선도동',
          'wolseong-dong': '월성동',
          'yonggang-dong': '용강동',
          'hwangseong-dong': '황성동',
          'dongcheon-dong': '동천동',
          'bulguk-dong': '불국동',
          'bodeok-dong': '보덕동',
        },
      },
      gimcheon: {
        districtsname: '김천',
        districtseng: 'gyeongbuk-gimcheon',
        dongStations: {
          'apo-eup': '아포읍',
          'nongso-myeon': '농소면',
          'nam-myeon': '남면',
          'gaeryeong-myeon': '개령면',
          'gammun-myeon': '감문면',
          'eomo-myeon': '어모면',
          'bongsan-myeon': '봉산면',
          'daehang-myeon': '대항면',
          'gamcheon-myeon': '감천면',
          'joma-myeon': '조마면',
          'guseong-myeon': '구성면',
          'jirye-myeon': '지례면',
          'buhang-myeon': '부항면',
          'daedeok-myeon': '대덕면',
          'jeungsan-myeon': '증산면',
          'jasan-dong': '자산동',
          'pyeonghwa-namsan-dong': '평화남산동',
          'yanggeum-dong': '양금동',
          'daesin-dong': '대신동',
          'daegok-dong': '대곡동',
          'jijwa-dong': '지좌동',
          'yulgok-dong': '율곡동',
          'gimcheon-station': '김천역',
          'gimcheon-gumi-station': '김천구미역',
        },
      },
      andong: {
        districtsname: '안동',
        districtseng: 'gyeongbuk-andong',
        dongStations: {
          'pungsan-eup': '풍산읍',
          'waryong-myeon': '와룡면',
          'bukhu-myeon': '북후면',
          'seohu-myeon': '서후면',
          'pungcheon-myeon': '풍천면',
          'iljik-myeon': '일직면',
          'namhu-myeon': '남후면',
          'namseon-myeon': '남선면',
          'imha-myeon': '임하면',
          'gilan-myeon': '길안면',
          'imdong-myeon': '임동면',
          'yean-myeon': '예안면',
          'dosan-myeon': '도산면',
          'nokjeon-myeon': '녹전면',
          'junggu-dong': '중구동',
          'myeongnyun-dong': '명륜동',
          'yongsang-dong': '용상동',
          'seogu-dong': '서구동',
          'taehwa-dong': '태화동',
          'pyeonghwa-dong': '평화동',
          'angi-dong': '안기동',
          'ok-dong': '옥동',
          'songha-dong': '송하동',
          'gangnam-dong': '강남동',
          'andong-station': '안동역',
        },
      },
      gumi: {
        districtsname: '구미',
        districtseng: 'gyeongbuk-gumi',
        dongStations: {
          'seonsan-eup': '선산읍',
          'goa-eup': '고아읍',
          'sandong-eup': '산동읍',
          'mueul-myeon': '무을면',
          'okseong-myeon': '옥성면',
          'dogae-myeon': '도개면',
          'haepyeong-myeon': '해평면',
          'jangcheon-myeon': '장천면',
          'songjeong-dong': '송정동',
          'wonpyeong-dong': '원평동',
          'doryang-dong': '도량동',
          'jisan-dong': '지산동',
          'seonju-wonam-dong': '선주원남동',
          'hyeonggok-dong': '형곡동',
          'sinpyeong-dong': '신평동',
          'bisan-dong': '비산동',
          'gwangpyeong-dong': '광평동',
          'sangmo-sagok-dong': '상모사곡동',
          'imo-dong': '임오동',
          'indong-dong': '인동동',
          'jinmi-dong': '진미동',
          'yangpo-dong': '양포동',
          'gongdan-dong': '공단동',
          'gumi-station': '구미역',
          'seonsan-station': '선산역',
        },
      },
      yeongju: {
        districtsname: '영주',
        districtseng: 'gyeongbuk-yeongju',
        dongStations: {
          'punggi-eup': '풍기읍',
          'isan-myeon': '이산면',
          'pyeongeun-myeon': '평은면',
          'munsu-myeon': '문수면',
          'jangsu-myeon': '장수면',
          'anjeong-myeon': '안정면',
          'bonghyeon-myeon': '봉현면',
          'sunheung-myeon': '순흥면',
          'dansan-myeon': '단산면',
          'buseok-myeon': '부석면',
          'sangmang-dong': '상망동',
          'hamang-dong': '하망동',
          'yeongju-dong': '영주동',
          'hyucheon-dong': '휴천동',
          'gaheung-dong': '가흥동',
          'yeongju-station': '영주역',
        },
      },
      yeongcheon: {
        districtsname: '영천',
        districtseng: 'gyeongbuk-yeongcheon',
        dongStations: {
          'geumho-eup': '금호읍',
          'cheongtong-myeon': '청통면',
          'sinnyeong-myeon': '신녕면',
          'hwasan-myeon': '화산면',
          'hwabuk-myeon': '화북면',
          'hwanam-myeon': '화남면',
          'jayang-myeon': '자양면',
          'imgo-myeon': '임고면',
          'gogyeong-myeon': '고경면',
          'bukan-myeon': '북안면',
          'daechang-myeon': '대창면',
          'dongbu-dong': '동부동',
          'seobu-dong': '서부동',
          'wansan-dong': '완산동',
          'nambu-dong': '남부동',
          'yeongcheon-station': '영천역',
        },
      },
      sangju: {
        districtsname: '상주',
        districtseng: 'gyeongbuk-sangju',
        dongStations: {
          'hamchang-eup': '함창읍',
          'jungdong-myeon': '중동면',
          'sabeolguk-myeon': '사벌국면',
          'nakdong-myeon': '낙동면',
          'cheongni-myeon': '청리면',
          'gongseong-myeon': '공성면',
          'oenam-myeon': '외남면',
          'naeseo-myeon': '내서면',
          'modong-myeon': '모동면',
          'moseo-myeon': '모서면',
          'hwadong-myeon': '화동면',
          'hwaseo-myeon': '화서면',
          'oeseo-myeon': '외서면',
          'euncheok-myeon': '은척면',
          'gonggeom-myeon': '공검면',
          'ian-myeon': '이안면',
          'namwon-dong': '남원동',
          'bungmun-dong': '북문동',
          'gyerim-dong': '계림동',
          'dongmun-dong': '동문동',
          'dongseong-dong': '동성동',
          'sinheung-dong': '신흥동',
          'sangju-station': '상주역',
        },
      },
      mungyeong: {
        districtsname: '문경',
        districtseng: 'gyeongbuk-mungyeong',
        dongStations: {
          'mungyeong-eup': '문경읍',
          'gaeun-eup': '가은읍',
          'yeongsun-myeon': '영순면',
          'sanyang-myeon': '산양면',
          'hogye-myeon': '호계면',
          'sanbuk-myeon': '산북면',
          'dongro-myeon': '동로면',
          'maseong-myeon': '마성면',
          'nongam-myeon': '농암면',
          'jeomchon-dong': '점촌동',
          'mungyeong-station': '문경역',
        },
      },
      gyeongsan: {
        districtsname: '경산',
        districtseng: 'gyeongbuk-gyeongsan',
        dongStations: {
          'hayang-eup': '하양읍',
          'jillyang-eup': '진량읍',
          'amnyang-eup': '압량읍',
          'wachon-myeon': '와촌면',
          'jain-myeon': '자인면',
          'yongseong-myeon': '용성면',
          'namsan-myeon': '남산면',
          'namcheon-myeon': '남천면',
          'jungbang-dong': '중방동',
          'bukbu-dong': '북부동',
          'gyeongsan-station': '경산역',
          'jillyang-station': '진량역',
          'jeongpyeong-station': '정평역',
          'yeongnamdae-station': '영남대역',
          'imdang-station': '임당역',
        },
      },
      gunwi: {
        districtsname: '군위',
        districtseng: 'gyeongbuk-gunwi',
        dongStations: {
          'gunwi-eup': '군위읍',
          'sobo-myeon': '소보면',
          'hyoryeong-myeon': '효령면',
          'bugye-myeon': '부계면',
          'ubo-myeon': '우보면',
          'uiheung-myeon': '의흥면',
          'sanseong-myeon': '산성면',
          'samgukyusa-myeon': '삼국유사면',
        },
      },
      uiseong: {
        districtsname: '의성',
        districtseng: 'gyeongbuk-uiseong',
        dongStations: {
          'uiseong-eup': '의성읍',
          'danchon-myeon': '단촌면',
          'jeomgok-myeon': '점곡면',
          'oksan-myeon': '옥산면',
          'sagok-myeon': '사곡면',
          'chunsan-myeon': '춘산면',
          'gaeum-myeon': '가음면',
          'geumseong-myeon': '금성면',
          'bongyang-myeon': '봉양면',
          'bian-myeon': '비안면',
          'gucheon-myeon': '구천면',
          'danmil-myeon': '단밀면',
          'danbuk-myeon': '단북면',
          'angye-myeon': '안계면',
          'dain-myeon': '다인면',
          'sinpyeong-myeon': '신평면',
          'anpyeong-myeon': '안평면',
          'ansa-myeon': '안사면',
        },
      },
      cheongsong: {
        districtsname: '청송',
        districtseng: 'gyeongbuk-cheongsong',
        dongStations: {
          'cheongsong-eup': '청송읍',
          'juwangsan-myeon': '주왕산면',
          'bunam-myeon': '부남면',
          'hyeondong-myeon': '현동면',
          'hyeonseo-myeon': '현서면',
          'andeok-myeon': '안덕면',
          'pacheon-myeon': '파천면',
          'jinbo-myeon': '진보면',
        },
      },
      yeongyang: {
        districtsname: '영양',
        districtseng: 'gyeongbuk-yeongyang',
        dongStations: {
          'yeongyang-eup': '영양읍',
          'ibam-myeon': '입암면',
          'cheonggi-myeon': '청기면',
          'irwol-myeon': '일월면',
          'subi-myeon': '수비면',
          'seokbo-myeon': '석보면',
        },
      },
      yeongdeok: {
        districtsname: '영덕',
        districtseng: 'gyeongbuk-yeongdeok',
        dongStations: {
          'yeongdeok-eup': '영덕읍',
          'ganggu-myeon': '강구면',
          'namjeong-myeon': '남정면',
          'dalsan-myeon': '달산면',
          'jipum-myeon': '지품면',
          'chuksan-myeon': '축산면',
          'yeonghae-myeon': '영해면',
          'byeonggok-myeon': '병곡면',
          'changsu-myeon': '창수면',
        },
      },
      cheongdo: {
        districtsname: '청도',
        districtseng: 'gyeongbuk-cheongdo',
        dongStations: {
          'hwayang-eup': '화양읍',
          'cheongdo-eup': '청도읍',
          'gangnam-myeon': '각남면',
          'punggak-myeon': '풍각면',
          'gangbuk-myeon': '각북면',
          'iseo-myeon': '이서면',
          'unmun-myeon': '운문면',
          'geumcheon-myeon': '금천면',
          'maejeon-myeon': '매전면',
        },
      },
      goryeong: {
        districtsname: '고령',
        districtseng: 'gyeongbuk-goryeong',
        dongStations: {
          'daegaya-eup': '대가야읍',
          'deokgok-myeon': '덕곡면',
          'unsu-myeon': '운수면',
          'seongsan-myeon': '성산면',
          'dasan-myeon': '다산면',
          'gaejin-myeon': '개진면',
          'ugok-myeon': '우곡면',
          'ssangnim-myeon': '쌍림면',
        },
      },
      seongju: {
        districtsname: '성주',
        districtseng: 'gyeongbuk-seongju',
        dongStations: {
          'seongju-eup': '성주읍',
          'seonnam-myeon': '선남면',
          'yongam-myeon': '용암면',
          'suryun-myeon': '수륜면',
          'gacheon-myeon': '가천면',
          'geumsu-myeon': '금수면',
          'daega-myeon': '대가면',
          'byeokjin-myeon': '벽진면',
          'chojeon-myeon': '초전면',
          'wolhang-myeon': '월항면',
        },
      },
      chilgok: {
        districtsname: '칠곡',
        districtseng: 'gyeongbuk-chilgok',
        dongStations: {
          'waegwan-eup': '왜관읍',
          'buksam-eup': '북삼읍',
          'seokjeok-eup': '석적읍',
          'jicheon-myeon': '지천면',
          'dongmyeong-myeon': '동명면',
          'gasan-myeon': '가산면',
          'yakmok-myeon': '약목면',
          'gisan-myeon': '기산면',
        },
      },
      yecheon: {
        districtsname: '예천',
        districtseng: 'gyeongbuk-yecheon',
        dongStations: {
          'yecheon-eup': '예천읍',
          'yongmun-myeon': '용문면',
          'bomun-myeon': '보문면',
          'homyeong-myeon': '호명면',
          'yucheon-myeon': '유천면',
          'yonggung-myeon': '용궁면',
          'gaepo-myeon': '개포면',
          'jibo-myeon': '지보면',
          'pungyang-myeon': '풍양면',
          'hyoja-myeon': '효자면',
          'eunpung-myeon': '은풍면',
        },
      },
      bonghwa: {
        districtsname: '봉화',
        districtseng: 'gyeongbuk-bonghwa',
        dongStations: {
          'bonghwa-eup': '봉화읍',
          'murya-myeon': '물야면',
          'bongseong-myeon': '봉성면',
          'beopjeon-myeon': '법전면',
          'chunyang-myeon': '춘양면',
          'socheon-myeon': '소천면',
          'jaesan-myeon': '재산면',
          'myeongho-myeon': '명호면',
          'sangun-myeon': '상운면',
          'seokpo-myeon': '석포면',
        },
      },
      uljin: {
        districtsname: '울진',
        districtseng: 'gyeongbuk-uljin',
        dongStations: {
          'uljin-eup': '울진읍',
          'pyeonghae-eup': '평해읍',
          'buk-myeon': '북면',
          'geunnam-myeon': '근남면',
          'giseong-myeon': '기성면',
          'onjeong-myeon': '온정면',
          'jukbyeon-myeon': '죽변면',
          'hupo-myeon': '후포면',
          'geumgangsong-myeon': '금강송면',
          'maehwa-myeon': '매화면',
        },
      },
      ulleung: {
        districtsname: '울릉',
        districtseng: 'gyeongbuk-ulleung',
        dongStations: {
          'ulleung-eup': '울릉읍',
        },
      },
    },
  },
  gyeongnam: {
    regionName: '경남',
    regionEng: 'gyeongnam',
    districts: {
      changwon: {
        districtsname: '창원',
        districtseng: 'gyeongnam-changwon',
        dongStations: {
          'dong-eup': '동읍',
          'buk-myeon': '북면',
          'daesan-myeon': '대산면',
          'uichang-dong': '의창동',
          'pallyong-dong': '팔룡동',
          'myeonggok-dong': '명곡동',
          'bongnim-dong': '봉림동',
          'bansong-dong': '반송동',
          'yongji-dong': '용지동',
          'jungang-dong': '중앙동',
          'sangnam-dong': '상남동',
          'sapa-dong': '사파동',
          'gaeumjeong-dong': '가음정동',
          'seongju-dong': '성주동',
          'ungnam-dong': '웅남동',
          'gusan-myeon': '구산면',
          'jindong-myeon': '진동면',
          'jinbuk-myeon': '진북면',
          'jinjeon-myeon': '진전면',
          'hyeon-dong': '현동',
          'gapo-dong': '가포동',
          'wolyeong-dong': '월영동',
          'munhwa-dong': '문화동',
          'banwol-jungang-dong': '반월중앙동',
          'wanwol-dong': '완월동',
          'jasan-dong': '자산동',
          'gyobang-dong': '교방동',
          'odong-dong': '오동동',
          'happo-dong': '합포동',
          'sanho-dong': '산호동',
          'naeseo-eup': '내서읍',
          'hoewon-dong': '회원동',
          'seokjeon-dong': '석전동',
          'hoeseong-dong': '회성동',
          'yangdeok-dong': '양덕동',
          'hapseong-dong': '합성동',
          'guam-dong': '구암동',
          'bongam-dong': '봉암동',
          'chungmu-dong': '충무동',
          'yeojoa-dong': '여좌동',
          'taebaek-dong': '태백동',
          'gyeonghwa-dong': '경화동',
          'byeongam-dong': '병암동',
          'seok-dong': '석동',
          'i-dong': '이동',
          'jaeun-dong': '자은동',
          'deoksan-dong': '덕산동',
          'pungho-dong': '풍호동',
          'ungcheon-dong': '웅천동',
          'ungdong-dong': '웅동동',
          'changwon-station': '창원역',
          'changwon-jungang-station': '창원중앙역',
          'masan-station': '마산역',
          'jungni-station': '중리역',
          'jinhae-station': '진해역',
        },
      },
      jinju: {
        districtsname: '진주',
        districtseng: 'gyeongnam-jinju',
        dongStations: {
          'munsan-eup': '문산읍',
          'naedong-myeon': '내동면',
          'jeongchon-myeon': '정촌면',
          'geumgok-myeon': '금곡면',
          'jinseong-myeon': '진성면',
          'ilbanseong-myeon': '일반성면',
          'ibanseong-myeon': '이반성면',
          'sabong-myeon': '사봉면',
          'jisu-myeon': '지수면',
          'daegok-myeon': '대곡면',
          'geumsan-myeon': '금산면',
          'jiphyeon-myeon': '집현면',
          'micheon-myeon': '미천면',
          'myeongseok-myeon': '명석면',
          'daepyeong-myeon': '대평면',
          'sugok-myeon': '수곡면',
          'cheonjeon-dong': '천전동',
          'seongbuk-dong': '성북동',
          'sangbong-dong': '상봉동',
          'sangdae-dong': '상대동',
          'hadae-dong': '하대동',
          'sangpyeong-dong': '상평동',
          'chojang-dong': '초장동',
          'pyeonggeo-dong': '평거동',
          'sinan-dong': '신안동',
          'ihyeon-dong': '이현동',
          'panmun-dong': '판문동',
          'gaho-dong': '가호동',
          'chungmugong-dong': '충무공동',
          'jinju-station': '진주역',
        },
      },
      tongyeong: {
        districtsname: '통영',
        districtseng: 'gyeongnam-tongyeong',
        dongStations: {
          'sanyang-eup': '산양읍',
          'yongnam-myeon': '용남면',
          'dosan-myeon': '도산면',
          'gwangdo-myeon': '광도면',
          'yokji-myeon': '욕지면',
          'hansan-myeon': '한산면',
          'saryang-myeon': '사량면',
          'docheon-dong': '도천동',
          'myeongjeong-dong': '명정동',
          'jeongnyang-dong': '정량동',
          'buksin-dong': '북신동',
          'misu-dong': '미수동',
          'bongpyeong-dong': '봉평동',
          'mujeon-dong': '무전동',
        },
      },
      sacheon: {
        districtsname: '사천',
        districtseng: 'gyeongnam-sacheon',
        dongStations: {
          'sacheon-eup': '사천읍',
          'jeongdong-myeon': '정동면',
          'sanam-myeon': '사남면',
          'yonghyeon-myeon': '용현면',
          'chukdong-myeon': '축동면',
          'gonyang-myeon': '곤양면',
          'gonmyeong-myeon': '곤명면',
          'seopo-myeon': '서포면',
          'dongseo-dong': '동서동',
          'seongu-dong': '선구동',
          'dongseogeum-dong': '동서금동',
          'beoryong-dong': '벌용동',
          'hyangchon-dong': '향촌동',
          'namyang-dong': '남양동',
        },
      },
      gimhae: {
        districtsname: '김해',
        districtseng: 'gyeongnam-gimhae',
        dongStations: {
          'jinyeong-eup': '진영읍',
          'juchon-myeon': '주촌면',
          'jillye-myeon': '진례면',
          'hallim-myeon': '한림면',
          'saengnim-myeon': '생림면',
          'sangdong-myeon': '상동면',
          'daedong-myeon': '대동면',
          'dongsang-dong': '동상동',
          'hoehyon-dong': '회현동',
          'buwon-dong': '부원동',
          'naeoe-dong': '내외동',
          'bukbu-dong': '북부동',
          'chilsan-seobu-dong': '칠산서부동',
          'hwalcheon-dong': '활천동',
          'saman-dong': '삼안동',
          'bulam-dong': '불암동',
          'jangyu-dong': '장유동',
          'gimhae-city-hall-station': '김해시청역',
          'jangyu-station': '장유역',
          'gayadae-station': '가야대역',
          'injedae-station': '인제대역',
          'gimhaedaehak-station': '김해대학역',
          'jinae-station': '지내역',
          'bulam-station': '불암역',
          'bonghwang-station': '봉황역',
          'suro-wangneung-station': '수로왕릉역',
        },
      },
      miryang: {
        districtsname: '밀양',
        districtseng: 'gyeongnam-miryang',
        dongStations: {
          'samnangjin-eup': '삼랑진읍',
          'hanam-eup': '하남읍',
          'bubuk-myeon': '부북면',
          'sanoe-myeon': '산외면',
          'sannae-myeon': '산내면',
          'danjang-myeon': '단장면',
          'sangnam-myeon': '상남면',
          'chodong-myeon': '초동면',
          'muan-myeon': '무안면',
          'cheongdo-myeon': '청도면',
          'naeil-dong': '내일동',
          'naei-dong': '내이동',
          'sammun-dong': '삼문동',
          'gagok-dong': '가곡동',
          'gyo-dong': '교동',
        },
      },
      geoje: {
        districtsname: '거제',
        districtseng: 'gyeongnam-geoje',
        dongStations: {
          'ilun-myeon': '일운면',
          'dongbu-myeon': '동부면',
          'nambu-myeon': '남부면',
          'geoje-myeon': '거제면',
          'dundeok-myeon': '둔덕면',
          'sadeung-myeon': '사등면',
          'yeoncho-myeon': '연초면',
          'hacheong-myeon': '하청면',
          'jangmok-myeon': '장목면',
          'jangseungpo-dong': '장승포동',
          'neungpo-dong': '능포동',
          'aju-dong': '아주동',
          'okpo-dong': '옥포동',
          'jangpyeong-dong': '장평동',
          'gohyeon-dong': '고현동',
          'sangmun-dong': '상문동',
          'suyang-dong': '수양동',
        },
      },
      yangsan: {
        districtsname: '양산',
        districtseng: 'gyeongnam-yangsan',
        dongStations: {
          'mulgeum-eup': '물금읍',
          'dong-myeon': '동면',
          'wondong-myeon': '원동면',
          'sangbuk-myeon': '상북면',
          'habuk-myeon': '하북면',
          'yangju-dong': '양주동',
          'samseong-dong': '삼성동',
          'gangseo-dong': '강서동',
          'seochang-dong': '서창동',
          'soju-dong': '소주동',
          'pyeongsan-dong': '평산동',
          'deokgye-dong': '덕계동',
          'yangsan-station': '양산역',
          'namyangsan-station': '남양산역',
          'yangsan-citizens-park-station': '양산시민공원역',
          'jeungsan-station': '증산역',
          'hopo-station': '호포역',
          'mulgeum-station': '물금역',
          'wondong-station': '원동역',
        },
      },
      uiryeong: {
        districtsname: '의령',
        districtseng: 'gyeongnam-uiryeong',
        dongStations: {
          'uiryeong-eup': '의령읍',
          'garye-myeon': '가례면',
          'chilgok-myeon': '칠곡면',
          'daeui-myeon': '대의면',
          'hwajeong-myeon': '화정면',
          'yongdeok-myeon': '용덕면',
          'jeonggok-myeon': '정곡면',
          'jijeong-myeon': '지정면',
          'nakseo-myeon': '낙서면',
          'burim-myeon': '부림면',
          'bongsu-myeon': '봉수면',
          'gungryu-myeon': '궁류면',
          'yugok-myeon': '유곡면',
        },
      },
      haman: {
        districtsname: '함안',
        districtseng: 'gyeongnam-haman',
        dongStations: {
          'gaya-eup': '가야읍',
          'chilwon-eup': '칠원읍',
          'haman-myeon': '함안면',
          'gunbuk-myeon': '군북면',
          'beopsu-myeon': '법수면',
          'chilseo-myeon': '칠서면',
          'chilbuk-myeon': '칠북면',
          'sanin-myeon': '산인면',
          'yeohang-myeon': '여항면',
        },
      },
      changnyeong: {
        districtsname: '창녕',
        districtseng: 'gyeongnam-changnyeong',
        dongStations: {
          'changnyeong-eup': '창녕읍',
          'namji-eup': '남지읍',
          'goam-myeon': '고암면',
          'seongsan-myeon': '성산면',
          'daehap-myeon': '대합면',
          'ibang-myeon': '이방면',
          'yueo-myeon': '유어면',
          'daeji-myeon': '대지면',
          'gyeseong-myeon': '계성면',
          'yeongsan-myeon': '영산면',
          'jangma-myeon': '장마면',
          'docheon-myeon': '도천면',
          'gilgok-myeon': '길곡면',
          'bugok-myeon': '부곡면',
        },
      },
      goseong: {
        districtsname: '고성',
        districtseng: 'gyeongnam-goseong',
        dongStations: {
          'goseong-eup': '고성읍',
          'samsan-myeon': '삼산면',
          'hail-myeon': '하일면',
          'hai-myeon': '하이면',
          'sangni-myeon': '상리면',
          'daega-myeon': '대가면',
          'yeonghyeon-myeon': '영현면',
          'yeongo-myeon': '영오면',
          'gaecheon-myeon': '개천면',
          'guman-myeon': '구만면',
          'hoehwa-myeon': '회화면',
          'maam-myeon': '마암면',
          'donghae-myeon': '동해면',
          'georyu-myeon': '거류면',
        },
      },
      namhae: {
        districtsname: '남해',
        districtseng: 'gyeongnam-namhae',
        dongStations: {
          'namhae-eup': '남해읍',
          'idong-myeon': '이동면',
          'sangju-myeon': '상주면',
          'samdong-myeon': '삼동면',
          'mijo-myeon': '미조면',
          'nam-myeon': '남면',
          'seo-myeon': '서면',
          'gohyeon-myeon': '고현면',
          'seolcheon-myeon': '설천면',
          'changseon-myeon': '창선면',
        },
      },
      hadong: {
        districtsname: '하동',
        districtseng: 'gyeongnam-hadong',
        dongStations: {
          'hadong-eup': '하동읍',
          'hwagae-myeon': '화개면',
          'agyang-myeon': '악양면',
          'jeongnyang-myeon': '적량면',
          'hoengcheon-myeon': '횡천면',
          'gojeon-myeon': '고전면',
          'geumnam-myeon': '금남면',
          'jingyo-myeon': '진교면',
          'yangbo-myeon': '양보면',
          'bukcheon-myeon': '북천면',
          'cheongam-myeon': '청암면',
          'okjong-myeon': '옥종면',
          'geumseong-myeon': '금성면',
        },
      },
      sancheong: {
        districtsname: '산청',
        districtseng: 'gyeongnam-sancheong',
        dongStations: {
          'sancheong-eup': '산청읍',
          'chahwang-myeon': '차황면',
          'obu-myeon': '오부면',
          'saengcho-myeon': '생초면',
          'geumseo-myeon': '금서면',
          'samjang-myeon': '삼장면',
          'sicheon-myeon': '시천면',
          'danseong-myeon': '단성면',
          'sinan-myeon': '신안면',
          'saengbiryang-myeon': '생비량면',
          'sindeung-myeon': '신등면',
        },
      },
      hamyang: {
        districtsname: '함양',
        districtseng: 'gyeongnam-hamyang',
        dongStations: {
          'hamyang-eup': '함양읍',
          'macheon-myeon': '마천면',
          'hyucheon-myeon': '휴천면',
          'yurim-myeon': '유림면',
          'sudong-myeon': '수동면',
          'jigok-myeon': '지곡면',
          'anui-myeon': '안의면',
          'seoha-myeon': '서하면',
          'seosang-myeon': '서상면',
          'baekjeon-myeon': '백전면',
          'byeonggok-myeon': '병곡면',
        },
      },
      geochang: {
        districtsname: '거창',
        districtseng: 'gyeongnam-geochang',
        dongStations: {
          'geochang-eup': '거창읍',
          'jusang-myeon': '주상면',
          'ungyang-myeon': '웅양면',
          'goje-myeon': '고제면',
          'buksang-myeon': '북상면',
          'wicheon-myeon': '위천면',
          'mari-myeon': '마리면',
          'namsang-myeon': '남상면',
          'namha-myeon': '남하면',
          'sinwon-myeon': '신원면',
          'gajo-myeon': '가조면',
          'gabuk-myeon': '가북면',
        },
      },
      hapcheon: {
        districtsname: '합천',
        districtseng: 'gyeongnam-hapcheon',
        dongStations: {
          'hapcheon-eup': '합천읍',
          'bongsan-myeon': '봉산면',
          'myosan-myeon': '묘산면',
          'gaya-myeon': '가야면',
          'yaro-myeon': '야로면',
          'yulgok-myeon': '율곡면',
          'chogye-myeon': '초계면',
          'ssangchaek-myeon': '쌍책면',
          'deokgok-myeon': '덕곡면',
          'cheongdeok-myeon': '청덕면',
          'jeokjung-myeon': '적중면',
          'daeyang-myeon': '대양면',
          'ssangbaek-myeon': '쌍백면',
          'samga-myeon': '삼가면',
          'gahoe-myeon': '가회면',
          'daebyeong-myeon': '대병면',
          'yongju-myeon': '용주면',
        },
      },
    },
  },
};

// districtData는 window.districtMap에서 자동 생성 (중앙화)
function getDistrictData() {
  const districtData = {};
  const districtMap = window.districtMap || {};

  for (const [key, value] of Object.entries(districtMap)) {
    if (value.regionName && value.districts) {
      // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
      const districtNames = Object.values(value.districts).map((district) => {
        if (typeof district === 'string') {
          // 기존 구조 (하위 호환성)
          return district;
        } else if (district && district.districtsname) {
          // 새 구조
          return district.districtsname;
        }
        return district;
      });
      districtData[value.regionName] = districtNames;
    }
  }

  return districtData;
}

// shop-card-data.js에서 업체 데이터 로드
async function loadShopCardsFromDataFile() {
  // shop-card-data.js가 이미 로드되어 있다면 window.shopCardData 사용
  if (window.shopCardData) {
    return window.shopCardData;
  }

  // 동적으로 스크립트 로드
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'js/shop-card-data.js';
    script.onload = () => {
      resolve(window.shopCardData || []);
    };
    script.onerror = () => {
      console.warn('shop-card-data.js 로드 실패, 빈 배열 반환');
      resolve([]);
    };
    document.head.appendChild(script);
  });
}

// company- HTML 파일에서 업체 데이터 추출
async function loadShopDataFromHTMLFiles() {
  try {
    // company- 접두사가 붙은 HTML 파일 목록 가져오기
    const companyFiles = await getCompanyHTMLFiles();
    const shops = [];

    // 각 HTML 파일에서 데이터 추출 (최대 100개씩 배치로 처리)
    const batchSize = 100;
    for (let i = 0; i < companyFiles.length; i += batchSize) {
      const batch = companyFiles.slice(i, i + batchSize);
      const batchShops = await Promise.all(
        batch.map((file) => extractShopDataFromHTML(file))
      );
      shops.push(...batchShops.filter((shop) => shop !== null));
    }

    return shops;
  } catch (error) {
    console.error('HTML 파일에서 업체 데이터 로드 중 오류:', error);
    return [];
  }
}

// company- 접두사가 붙은 HTML 파일 목록 가져오기
async function getCompanyHTMLFiles() {
  try {
    // sitemap.xml이나 파일 목록 API가 있다면 사용
    // 없으면 현재 페이지에서 company- 파일 목록을 추론
    // 실제 구현에서는 서버에서 파일 목록을 제공해야 함
    const response = await fetch('sitemap.xml');
    if (response.ok) {
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      const urls = xmlDoc.querySelectorAll('url loc');
      const companyFiles = [];
      urls.forEach((url) => {
        const href = url.textContent;
        if (href && href.includes('company-') && href.endsWith('.html')) {
          const fileName = href.split('/').pop();
          companyFiles.push(fileName);
        }
      });
      return companyFiles;
    }
  } catch (error) {
    console.warn('sitemap.xml을 찾을 수 없습니다. 기본 파일 목록 사용:', error);
  }

  // 기본 파일 목록 (shop-card-data.js에서 가져오기)
  if (window.shopCardData) {
    return window.shopCardData.map((shop) => shop.file);
  }

  return [];
}

// HTML 파일에서 JSON-LD 스키마를 파싱하여 업체 데이터 추출
async function extractShopDataFromHTML(fileName) {
  try {
    const response = await fetch(fileName);
    if (!response.ok) return null;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // JSON-LD 스키마 찾기
    const jsonLdScripts = doc.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    let shopData = null;

    for (const script of jsonLdScripts) {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@type'] === 'HealthAndBeautyBusiness') {
          shopData = data;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!shopData) return null;

    // shop-card-data.js에서 추가 정보 가져오기
    const shopCardData = window.shopCardData?.find((s) => s.file === fileName);

    // 업체 데이터 구성
    const shop = {
      id: shopCardData?.id || parseInt(fileName.match(/\d+/)?.[0] || '0'),
      name: shopData.name || '',
      type: shopCardData?.type || '마사지',
      country: shopCardData?.country || 'korea',
      region:
        shopData.address?.addressRegion
          ?.replace('특별자치도', '')
          .replace('광역시', '')
          .replace('시', '')
          .trim() || '',
      district: shopData.address?.addressLocality || '',
      address:
        shopData.address?.streetAddress ||
        shopData.address?.addressLocality ||
        '',
      detailAddress: shopCardData?.detailAddress || '',
      phone: shopData.telephone?.replace(/[^0-9]/g, '') || '',
      rating: parseFloat(shopData.aggregateRating?.ratingValue || 0),
      reviewCount: parseInt(shopData.aggregateRating?.reviewCount || 0),
      price: shopData.priceRange || '',
      description: shopData.description || '',
      image: shopData.image || '',
      services: shopCardData?.services || [],
      operatingHours: shopData.openingHoursSpecification
        ? `${shopData.openingHoursSpecification.opens} ~ ${shopData.openingHoursSpecification.closes}`
        : '',
      file: fileName,
      showHealingShop:
        shopCardData?.showHealingShop !== undefined
          ? shopCardData.showHealingShop
          : true,
      greeting: shopCardData?.greeting,
    };

    return shop;
  } catch (error) {
    console.error(`파일 ${fileName}에서 데이터 추출 중 오류:`, error);
    return null;
  }
}

// 업체 데이터 초기화 및 병합
async function initializeShopData() {
  try {
    // shop-card-data.js만 사용 (company HTML 제거, 동적 연동)
    const loadedShops = await loadShopCardsFromDataFile();
    massageShops = sortShops(loadedShops || []);
    window.massageShops = massageShops;
    // 오버라이드는 표시를 막지 않도록 실패/지연 허용 (file:// 제외)
    if (
      typeof location !== 'undefined' &&
      location.protocol !== 'file:' &&
      typeof applyShopOverridesToCardData === 'function'
    ) {
      try {
        await applyShopOverridesToCardData();
        massageShops = sortShops(window.shopCardData || massageShops);
        window.massageShops = massageShops;
      } catch (e) {
        console.warn('shop overrides skipped', e);
      }
    }
  } catch (error) {
    console.error('업체 데이터 초기화 중 오류:', error);
    const loadedShops = await loadShopCardsFromDataFile();
    massageShops = sortShops(loadedShops || []);
    window.massageShops = massageShops;
  }
}

// 마사지 업체 데이터 (동적으로 로드됨)
// 모든 데이터는 company- 접두사가 붙은 HTML 파일에서 동적으로 로드됨
let massageShops = [];

// DOM 요소들
const regionSelect = document.getElementById('regionSelect');
const districtSelect = document.getElementById('districtSelect');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const massageList = document.getElementById('massageList');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');

// 현재 필터 상태
let currentFilter = 'all';
let currentRegion = '';
let currentDistrict = '';
let currentSearchQuery = ''; // 검색어 저장
let currentCountry = 'overall';

// 출장 업체 복수 지역(서울/경기/인천 등) 매칭용
const SHOP_REGION_NAMES = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

const CITY_TO_SHOP_REGION = {
  강릉: '강원',
  동해: '강원',
  양양: '강원',
  평창: '강원',
  속초: '강원',
  춘천: '강원',
  원주: '강원',
  청주: '충북',
  충주: '충북',
  제천: '충북',
  진천: '충북',
  음성: '충북',
  증평: '충북',
  오창: '충북',
  오송: '충북',
  천안: '충남',
  아산: '충남',
  전주: '전북',
  군산: '전북',
  익산: '전북',
  나주: '전남',
  순천: '전남',
  여수: '전남',
  목포: '전남',
  담양: '전남',
  포항: '경북',
  경주: '경북',
  구미: '경북',
  경산: '경북',
  창원: '경남',
  김해: '경남',
  진주: '경남',
  양산: '경남',
  수원: '경기',
  용인: '경기',
  성남: '경기',
  고양: '경기',
  부천: '경기',
  안양: '경기',
  화성: '경기',
  광교: '경기',
  제주도: '제주',
  제주시: '제주',
  서귀포: '제주',
  조치원: '세종',
};

function isOutcallShop(shop) {
  if (!shop) return false;
  if (shop.type === '출장마사지' || shop.type === 'outcall') return true;
  if (
    Array.isArray(shop.services) &&
    shop.services.some((s) => String(s).includes('출장'))
  ) {
    return true;
  }
  return false;
}

/** 출장 타입만 (필터용: type 필드 기준) */
function isOutcallType(shop) {
  if (!shop) return false;
  const t = String(shop.type || '').trim();
  return t === '출장마사지' || t.toLowerCase() === 'outcall';
}

/**
 * 샵 마사지 타입 (출장 제외)
 * 마사지 · 스웨디시 · 타이 · 아로마 · 중국 · 발 · 스파 포함
 */
function isMassageType(shop) {
  if (!shop || isOutcallType(shop)) return false;
  const t = String(shop.type || '').trim();
  const tl = t.toLowerCase();
  if (t === '마사지' || tl === 'massage' || tl === 'korean') return true;
  if (
    [
      'swedish',
      'thai',
      'aroma',
      'chinese',
      'foot',
      'spa',
    ].includes(tl)
  ) {
    return true;
  }
  if (
    /스웨디시|타이|아로마|중국|발마사지|스파|경락|안마/.test(t) &&
    !/출장/.test(t)
  ) {
    return true;
  }
  // type에 '마사지'가 있어도 출장이면 위에서 제외됨
  if (t.includes('마사지')) return true;
  return false;
}

window.isOutcallType = isOutcallType;
window.isMassageType = isMassageType;

function getShopRegionList(shop) {
  const found = [];
  const add = (region) => {
    if (region && !found.includes(region)) found.push(region);
  };

  const addFromRegionField = () => {
    String(shop.region || '')
      .split(/[,·\/|]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach(add);
  };

  // 출장: 주소/오시는길에 적힌 서울·경기·인천 등도 검색 대상에 포함
  if (isOutcallShop(shop)) {
    const text = [
      shop.address,
      shop.detailAddress,
      shop.directions,
      shop.description,
      shop.detailContent,
    ]
      .filter(Boolean)
      .join(' ');
    SHOP_REGION_NAMES.forEach((region) => {
      if (text.includes(region)) add(region);
    });
    Object.keys(CITY_TO_SHOP_REGION).forEach((city) => {
      if (text.includes(city)) add(CITY_TO_SHOP_REGION[city]);
    });
    // 서비스권역 문구가 없으면 region 필드 사용
    if (!found.length) addFromRegionField();
    return found;
  }

  addFromRegionField();
  return found;
}

function shopMatchesRegion(shop, region) {
  if (!region) return true;
  return getShopRegionList(shop).includes(region);
}

/** UI '강남' ↔ 데이터 '강남구' 정규화 */
function normalizeDistrictName(name) {
  return String(name || '')
    .trim()
    .replace(/(특별자치시|특별시|광역시)$/u, '')
    .replace(/(특별자치구|자치구)$/u, '')
    .replace(/(구|군|시)$/u, '');
}

/** 세부지역(구/시/군) 매칭 — '강남' === '강남구' 허용 */
function shopMatchesDistrict(shop, district) {
  if (!district) return true;
  if (!shop) return false;
  if (isOutcallType(shop) || isOutcallShop(shop)) return true;
  return isExactDistrictShop(shop, district);
}

/** 선택 구에 실제로 속한 업체인지 (출장 자동통과 없음) */
function isExactDistrictShop(shop, district) {
  if (!shop || !district) return false;
  const rawA = String(shop.district || '').trim();
  const rawB = String(district || '').trim();
  if (rawA && rawA === rawB) return true;
  const a = normalizeDistrictName(rawA);
  const b = normalizeDistrictName(rawB);
  if (!a || !b) return false;
  return a === b;
}

/** 구/시 대략 중심 좌표 (가까운 순 정렬용) */
const DISTRICT_COORDS = {
  // 서울
  강남: [37.5172, 127.0473],
  강동: [37.5301, 127.1238],
  강북: [37.6396, 127.0257],
  강서: [37.5509, 126.8495],
  관악: [37.4784, 126.9516],
  광진: [37.5384, 127.0822],
  구로: [37.4954, 126.8874],
  금천: [37.4601, 126.9008],
  노원: [37.6542, 127.0568],
  도봉: [37.6688, 127.0471],
  동대문: [37.5744, 127.0396],
  동작: [37.5124, 126.9393],
  마포: [37.5663, 126.9019],
  서대문: [37.5791, 126.9368],
  서초: [37.4837, 127.0324],
  성동: [37.5633, 127.0366],
  성북: [37.5894, 127.0167],
  송파: [37.5145, 127.1059],
  양천: [37.517, 126.8664],
  영등포: [37.5264, 126.8962],
  용산: [37.5326, 126.9906],
  은평: [37.6027, 126.9291],
  종로: [37.5735, 126.9788],
  중: [37.5641, 126.9979], // 중구 정규화
  중랑: [37.6063, 127.0925],
  // 부산
  해운대: [35.1631, 129.1635],
  부산진: [35.1628, 129.0532],
  동래: [35.2045, 129.078],
  수영: [35.1455, 129.113],
  연제: [35.1762, 129.0797],
  사상: [35.1526, 128.991],
  사하: [35.1046, 128.974],
  금정: [35.2428, 129.092],
  기장: [35.2445, 129.222],
  영도: [35.0912, 129.0678],
  // 인천
  미추홀: [37.4635, 126.6505],
  연수: [37.4101, 126.6783],
  남동: [37.4469, 126.7315],
  부평: [37.507, 126.7218],
  계양: [37.537, 126.7377],
  // 경기 (시 단위)
  수원: [37.2636, 127.0286],
  성남: [37.4201, 127.1267],
  용인: [37.2411, 127.1776],
  고양: [37.6584, 126.832],
  부천: [37.5034, 126.766],
  안양: [37.3943, 126.9568],
  안산: [37.3219, 126.8309],
  화성: [37.1995, 126.8312],
  남양주: [37.636, 127.2165],
  평택: [36.9921, 127.1129],
  의정부: [37.7381, 127.0338],
  시흥: [37.3799, 126.8031],
  파주: [37.7599, 126.7802],
  김포: [37.6153, 126.7155],
  광명: [37.4163, 126.884],
  광주: [37.4294, 127.255], // 경기 광주
  군포: [37.3617, 126.9352],
  하남: [37.5392, 127.2148],
  오산: [37.1498, 127.0772],
  이천: [37.272, 127.435],
  양주: [37.7853, 127.0458],
  구리: [37.5943, 127.1296],
  안성: [37.008, 127.2797],
  포천: [37.8949, 127.2002],
  의왕: [37.3449, 126.9683],
  양평: [37.4912, 127.487],
  여주: [37.2982, 127.637],
  동두천: [37.9034, 127.0605],
  과천: [37.4292, 126.987],
  가평: [37.8315, 127.510],
  연천: [38.096, 127.075],
};

function getDistrictCoords(districtName) {
  const key = normalizeDistrictName(districtName);
  if (!key) return null;
  if (DISTRICT_COORDS[key]) return DISTRICT_COORDS[key];
  // 중구 등
  if (key === '중구' && DISTRICT_COORDS['중']) return DISTRICT_COORDS['중'];
  return null;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** 선택 구 기준 업체까지 대략 거리(km). 좌표 없으면 큰 값 */
function getShopDistanceToDistrict(shop, district) {
  if (!shop || !district) return Number.POSITIVE_INFINITY;
  if (isExactDistrictShop(shop, district)) return 0;
  const from = getDistrictCoords(district);
  const to = getDistrictCoords(shop.district);
  if (!from || !to) return 999;
  return Math.round(haversineKm(from[0], from[1], to[0], to[1]) * 10) / 10;
}

function compareHealingFirst(a, b) {
  const ha = a.showHealingShop === true ? 0 : 1;
  const hb = b.showHealingShop === true ? 0 : 1;
  return ha - hb;
}

/**
 * 세부지역 선택 시 정렬
 * 1) 선택 구(예: 강남) 업체 전부 상단
 * 2) 그 아래 같은 지역 나머지를 가까운 순
 */
function sortShopsByProximity(shops, district) {
  const list = shops || [];
  const primary = list
    .filter((shop) => isExactDistrictShop(shop, district))
    .sort(compareHealingFirst);

  const nearby = list
    .filter((shop) => !isExactDistrictShop(shop, district))
    .map((shop) => ({
      shop,
      km: getShopDistanceToDistrict(shop, district),
    }))
    .sort((a, b) => {
      if (a.km !== b.km) return a.km - b.km;
      return compareHealingFirst(a.shop, b.shop);
    })
    .map(({ shop, km }) => {
      shop._proximityKm = km;
      shop._isSelectedDistrict = false;
      return shop;
    });

  primary.forEach((shop) => {
    shop._proximityKm = 0;
    shop._isSelectedDistrict = true;
  });

  return [...primary, ...nearby];
}

window.isOutcallShop = isOutcallShop;
window.getShopRegionList = getShopRegionList;
window.shopMatchesRegion = shopMatchesRegion;
window.normalizeDistrictName = normalizeDistrictName;
window.isExactDistrictShop = isExactDistrictShop;
window.shopMatchesDistrict = shopMatchesDistrict;
window.getShopDistanceToDistrict = getShopDistanceToDistrict;
window.sortShopsByProximity = sortShopsByProximity;

// 검색 디바운싱을 위한 타이머
// 성인 인증 관련 함수 제거됨

// 페이지 로드 시 초기화 (아래 3088라인에서 실행됨)

// 지역 선택 옵션 초기화
function initializeRegionOptions() {
  console.log('initializeRegionOptions 호출');
  const regionSelect = document.getElementById('regionSelect');
  console.log('regionSelect:', regionSelect);
  if (!regionSelect) {
    console.log('regionSelect 없음 - 종료');
    return;
  }

  console.log(
    'regionSelect 찾음, 초기 옵션 개수:',
    regionSelect.children.length
  );

  // 기존 옵션 제거 (첫 번째 옵션 "지역을 선택하세요" 제외)
  while (regionSelect.children.length > 1) {
    regionSelect.removeChild(regionSelect.lastChild);
  }

  console.log('기존 옵션 제거 후:', regionSelect.children.length);

  // districtData의 키들을 커스텀 정렬하여 옵션으로 추가
  const customOrder = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '대전',
    '세종',
    '전북',
    '전남',
    '광주',
    '경북',
    '경남',
    '대구',
    '울산',
    '부산',
    '제주',
  ];

  const districtData = getDistrictData();
  console.log('districtData:', districtData);
  const regions = Object.keys(districtData).sort((a, b) => {
    const indexA = customOrder.indexOf(a);
    const indexB = customOrder.indexOf(b);
    return indexA - indexB;
  });
  console.log('정렬된 지역들:', regions);

  regions.forEach((region) => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  console.log('옵션 추가 완료, 최종 옵션 개수:', regionSelect.children.length);
}

// 지역별 테마 페이지 URL 생성 함수는 initializeApp 함수 내부로 이동되었습니다.
// 전역에서 접근하려면 window.getThemePageUrl을 사용하세요.

// 앱 초기화
function initializeApp() {
  // header-search-btn 바인딩
  bindHeaderSearchButton();

  // filter-section과 filter-container를 header 아래에 고정
  updateFilterStickyPosition();

  // 스크롤 시 filter 위치 업데이트
  window.addEventListener('scroll', updateFilterStickyPosition);
  window.addEventListener('resize', updateFilterStickyPosition);

  // 지역 선택 옵션 동적 생성
  initializeRegionOptions();

  // 초기 상태 설정 - 전체 필터 버튼 활성화
  const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allFilterBtn) {
    allFilterBtn.classList.add('active');
  }

  // footer-links 텍스트 초기 업데이트
  updateFooterLinkText();

  // 파일명에서 지역과 세부지역 자동 감지 (효율적인 중앙화된 로직)
  const currentPath = window.location.pathname;
  const currentFileName = currentPath.split('/').pop();
  const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);

  if (detectedInfo.region) {
    currentRegion = detectedInfo.region;
    currentDistrict = detectedInfo.district || '';
    if (detectedInfo.filter) {
      currentFilter = detectedInfo.filter;
    }

    // 구 선택 활성화 및 동/역 옵션 업데이트 (세부지역이 있는 경우)
    if (detectedInfo.district) {
      const districtSelect = document.getElementById('districtSelect');
      if (districtSelect) {
        districtSelect.disabled = false;
        districtSelect.style.opacity = '1';

        // regionSelect와 districtSelect 값 설정
        if (regionSelect) {
          regionSelect.value = detectedInfo.region;
          // updateDistrictOptions에 선택된 값도 전달
          updateDistrictOptions(detectedInfo.region, detectedInfo.district);
        }
      }
    }
  }

  // 검색 버튼 이벤트 리스너 (searchBtn이 존재할 때만)
  if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 동작 방지
      performSearch();
    });
  }

  // 필터 버튼 이벤트 리스너는 initializeApp 함수에서 처리됩니다

  // 타입 필터 드롭다운 기능
  const typeFilterBtn = document.getElementById('typeFilterBtn');
  const typeDropdownMenu = document.getElementById('typeDropdownMenu');
  const typeDropdownItems = document.querySelectorAll('.type-dropdown-item');

  // 타입 드롭다운 아이템 클릭 이벤트
  typeDropdownItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const selectedTheme = this.dataset.type;

      // 현재 선택된 지역과 세부지역 가져오기 (선택 박스 우선)
      const regionSelect = document.getElementById('regionSelect');
      const districtSelect = document.getElementById('districtSelect');
      const dongStationSelect = document.getElementById('dongStationSelect');

      let region = currentRegion;
      let district = currentDistrict;
      let dongStationKey = '';

      // 선택 박스에서 값 가져오기 (우선순위)
      if (regionSelect && regionSelect.value) {
        region = regionSelect.value;
      }
      if (districtSelect && districtSelect.value) {
        district = districtSelect.value;
      }
      // 동/역 선택값 가져오기
      if (dongStationSelect && dongStationSelect.value) {
        dongStationKey = dongStationSelect.value;
      } else {
        // 파일명에서 동/역 키 추출 (백업용)
        const currentPath = window.location.pathname;
        const currentFileName = currentPath
          .split('/')
          .pop()
          .replace('.html', '');
        const parts = currentFileName.split('-');
        const filterKeywords = [
          'massage',
          'outcall',
          'swedish',
          'thai',
          'aroma',
          'waxing',
          'chinese',
          'foot',
          'spa',
        ];

        let dongParts = [];
        for (let i = 2; i < parts.length; i++) {
          if (filterKeywords.includes(parts[i])) {
            break;
          }
          dongParts.push(parts[i]);
        }
        if (dongParts.length > 0) {
          dongStationKey = dongParts.join('-');
        }
      }

      // 중앙화된 함수로 테마 페이지 URL 생성
      const targetPage = window.getThemePageUrl
        ? window.getThemePageUrl(
            selectedTheme,
            region,
            district,
            dongStationKey
          )
        : null;
      if (targetPage) {
        window.location.href = targetPage;
        return;
      }
    });
  });

  // 타입보기 버튼 클릭 이벤트
  if (typeFilterBtn && typeDropdownMenu) {
    typeFilterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // 테마 필터 섹션 토글
      const themeFilterSection = document.getElementById('themeFilterSection');
      if (themeFilterSection) {
        const isVisible = themeFilterSection.style.display !== 'none';
        themeFilterSection.style.display = isVisible ? 'none' : 'block';

        // 버튼 눌러진 표시 토글
        typeFilterBtn.classList.toggle('active', !isVisible);

        // 테마 필터 섹션이 보여질 때 필터 섹션 바로 아래에 고정되도록 위치 조정
        if (!isVisible) {
          // 필터 섹션의 실제 높이를 계산하여 위치 조정
          const filterSection = document.querySelector('.filter-section');
          if (filterSection) {
            // 약간의 지연을 두고 계산하여 DOM 업데이트 완료 후 위치 계산
            setTimeout(() => {
              // 필터 섹션의 실제 높이 (offsetHeight 사용)
              const filterSectionHeight = filterSection.offsetHeight;
              // 필터 섹션의 getBoundingClientRect로 현재 viewport에서의 위치 확인
              const filterSectionRect = filterSection.getBoundingClientRect();

              // 필터 섹션이 sticky로 고정되어 있는지 확인 (top이 1px 근처인지)
              const isFilterSticky = filterSectionRect.top <= 10;

              if (isFilterSticky) {
                // 필터 섹션이 sticky로 고정되어 있으면: 헤더 높이 + 필터 섹션 높이
                const header = document.getElementById('mainHeader');
                const headerHeight = header ? header.offsetHeight : 80;
                themeFilterSection.style.top = `${
                  headerHeight + filterSectionHeight
                }px`;
              } else {
                // 필터 섹션이 sticky가 아니면: 필터 섹션의 viewport 기준 bottom 위치
                const filterSectionBottom =
                  filterSectionRect.top + filterSectionHeight;
                themeFilterSection.style.top = `${filterSectionBottom}px`;
              }
            }, 10);
          } else {
            // 필터 섹션을 찾을 수 없는 경우 기본값 사용 (여백 조정)
            const header = document.getElementById('mainHeader');
            const headerHeight = header ? header.offsetHeight : 80;
            const defaultFilterHeight = 60;
            themeFilterSection.style.top = `${
              headerHeight + defaultFilterHeight
            }px`;
          }
        }

        // 테마 필터 섹션이 보여질 때 전체 보기 버튼 활성화 (눌림표시 없이)
        if (!isVisible) {
          // 전체 보기 버튼은 기능적으로만 활성화 (눌림표시 없이)
          const allFilterBtn = document.querySelector(
            '.filter-btn[data-filter="all"]'
          );
          if (allFilterBtn) {
            allFilterBtn.classList.remove('active'); // 눌림표시 제거
          }

          // 다른 필터 버튼들 비활성화 (테마보기 버튼은 제외)
          document.querySelectorAll('.filter-btn').forEach((btn) => {
            if (!btn.classList.contains('type-filter-btn')) {
              btn.classList.remove('active');
            }
          });

          // 테마 박스 중 전체 활성화
          const themeBoxes = document.querySelectorAll('.theme-box');
          themeBoxes.forEach((box) => box.classList.remove('active'));
          const allThemeBox = document.querySelector(
            '.theme-box[data-theme="all"]'
          );
          if (allThemeBox) {
            allThemeBox.classList.add('active');
          }

          // 현재 필터를 'all'로 설정하고 모든 업체 표시
          currentFilter = 'all';
          displayFilteredResults();
        }
      }
    });
  }

  // 테마 박스 클릭 이벤트 (중앙화된 로직 사용)
  const themeBoxes = document.querySelectorAll('.theme-box');
  themeBoxes.forEach((box) => {
    // onclick 속성 제거를 위해 기존 이벤트 리스너만 사용
    box.addEventListener('click', function (e) {
      // onclick 속성이 있으면 기본 동작 방지
      if (this.onclick || this.getAttribute('onclick')) {
        e.preventDefault();
        e.stopPropagation();
        // onclick 제거
        this.removeAttribute('onclick');
        this.onclick = null;
      }

      e.preventDefault();
      e.stopPropagation();

      // 모든 테마 박스에서 active 클래스 제거
      themeBoxes.forEach((b) => {
        b.classList.remove('active');
        // 다른 박스의 onclick도 제거
        if (b !== this) {
          b.removeAttribute('onclick');
          b.onclick = null;
        }
      });
      // 클릭된 박스에 active 클래스 추가
      this.classList.add('active');

      // 선택된 테마로 필터링
      const selectedTheme = this.dataset.theme;

      // 중앙화된 함수로 테마 페이지 URL 생성
      if (selectedTheme !== 'all' && window.getThemePageUrl) {
        // 현재 선택된 지역과 세부지역 가져오기 (선택 박스 우선)
        const regionSelect = document.getElementById('regionSelect');
        const districtSelect = document.getElementById('districtSelect');
        const dongStationSelect = document.getElementById('dongStationSelect');

        let region = currentRegion;
        let district = currentDistrict;
        let dongStationKey = '';

        // 선택 박스에서 값 가져오기 (우선순위)
        if (regionSelect && regionSelect.value) {
          region = regionSelect.value;
        }
        if (districtSelect && districtSelect.value) {
          district = districtSelect.value;
        }
        // 동/역 선택값 가져오기
        if (dongStationSelect && dongStationSelect.value) {
          dongStationKey = dongStationSelect.value;
        } else {
          // 파일명에서 동/역 키 추출 (백업용)
          const currentPath = window.location.pathname;
          const currentFileName = currentPath
            .split('/')
            .pop()
            .replace('.html', '');
          const parts = currentFileName.split('-');
          const filterKeywords = [
            'massage',
            'outcall',
            'swedish',
            'thai',
            'aroma',
            'waxing',
            'chinese',
            'foot',
            'spa',
          ];

          let dongParts = [];
          for (let i = 2; i < parts.length; i++) {
            if (filterKeywords.includes(parts[i])) {
              break;
            }
            dongParts.push(parts[i]);
          }
          if (dongParts.length > 0) {
            dongStationKey = dongParts.join('-');
          }
        }

        const targetPage = window.getThemePageUrl(
          selectedTheme,
          region,
          district,
          dongStationKey
        );
        if (targetPage) {
          window.location.href = targetPage;
          return;
        }
      }

      // 전체 선택 시 필터 적용
      currentFilter = selectedTheme;
      displayFilteredResults();

      // 테마 필터 섹션 숨기기
      const themeFilterSection = document.getElementById('themeFilterSection');
      if (themeFilterSection) {
        themeFilterSection.style.display = 'none';
      }

      // 테마보기 버튼 눌러진 표시 유지 (제거하지 않음)
    });
  });

  // 테마박스 외부 터치/스크롤 시 숨김 기능
  document.addEventListener('click', function (e) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.querySelector('.type-filter-btn');

    if (themeFilterSection && themeFilterSection.style.display === 'block') {
      // 테마박스나 테마보기 버튼이 아닌 곳을 클릭한 경우
      if (
        !themeFilterSection.contains(e.target) &&
        !typeFilterBtn.contains(e.target)
      ) {
        themeFilterSection.style.display = 'none';
        typeFilterBtn.classList.remove('active');
      }
    }
  });

  // 스크롤 시 테마박스 숨김
  document.addEventListener('scroll', function () {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.querySelector('.type-filter-btn');

    if (themeFilterSection && themeFilterSection.style.display === 'block') {
      themeFilterSection.style.display = 'none';
      typeFilterBtn.classList.remove('active');
    }
  });

  // 마우스 휠 스크롤 감지
  document.addEventListener('wheel', function (e) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.querySelector('.type-filter-btn');

    if (themeFilterSection && themeFilterSection.style.display === 'block') {
      themeFilterSection.style.display = 'none';
      typeFilterBtn.classList.remove('active');
    }
  });

  // 터치 이벤트로 스크롤 감지
  let touchStartY = 0;
  let isScrolling = false;

  document.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
    isScrolling = false;
  });

  document.addEventListener('touchmove', function (e) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.querySelector('.type-filter-btn');

    if (themeFilterSection && themeFilterSection.style.display === 'block') {
      const currentY = e.touches[0].clientY;
      const diffY = Math.abs(currentY - touchStartY);

      // 세로 스크롤이 감지되면 테마박스 숨김
      if (diffY > 10) {
        isScrolling = true;
        themeFilterSection.style.display = 'none';
        typeFilterBtn.classList.remove('active');
      }
    }
  });

  document.addEventListener('touchend', function (e) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.querySelector('.type-filter-btn');

    if (
      isScrolling &&
      themeFilterSection &&
      themeFilterSection.style.display === 'block'
    ) {
      themeFilterSection.style.display = 'none';
      typeFilterBtn.classList.remove('active');
    }
    isScrolling = false;
  });

  // 마사지 국가별 박스 이벤트 리스너
  const massageCountryBoxes = document.querySelectorAll(
    '#massageCountryFilterSection .country-box'
  );
  const massageCountryFilterSection = document.getElementById(
    'massageCountryFilterSection'
  );

  massageCountryBoxes.forEach((box) => {
    box.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 동작 방지
      // 마사지 국가 박스에서 active 클래스 제거
      massageCountryBoxes.forEach((b) => b.classList.remove('active'));
      // 클릭된 박스에 active 클래스 추가
      this.classList.add('active');
      // 현재 국가 업데이트
      currentCountry = this.dataset.country;
      // 필터링된 결과 표시
      displayFilteredResults();
      // 국가 필터 섹션 숨기기
      if (massageCountryFilterSection) {
        massageCountryFilterSection.style.display = 'none';
      }
    });
  });

  // 출장마사지 국가별 박스 이벤트 리스너
  const outcallCountryBoxes = document.querySelectorAll(
    '#outcallCountryFilterSection .country-box'
  );
  const outcallCountryFilterSection = document.getElementById(
    'outcallCountryFilterSection'
  );

  outcallCountryBoxes.forEach((box) => {
    box.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 동작 방지
      // 출장마사지 국가 박스에서 active 클래스 제거
      outcallCountryBoxes.forEach((b) => b.classList.remove('active'));
      // 클릭된 박스에 active 클래스 추가
      this.classList.add('active');
      // 현재 국가 업데이트
      currentCountry = this.dataset.country;
      // 필터링된 결과 표시
      displayFilteredResults();
      // 국가 필터 섹션 숨기기
      if (outcallCountryFilterSection) {
        outcallCountryFilterSection.style.display = 'none';
      }
    });
  });

  // 초기에는 전체 업체 표시
  displayFilteredResults();
}

// 구 옵션 업데이트
function updateDistrictOptions(region, selectedDistrictValue = null) {
  console.log(
    'updateDistrictOptions called with region:',
    region,
    'selectedDistrictValue:',
    selectedDistrictValue
  );

  // 현재 값 저장
  const currentValue = districtSelect.value;

  // 옵션만 업데이트 (아이콘 보존)
  districtSelect.innerHTML = '<option value="">세부 지역을 선택하세요</option>';

  const districtData = getDistrictData();
  if (region && districtData[region]) {
    console.log('District data for', region, ':', districtData[region]);
    districtData[region].forEach((district) => {
      // district가 객체인 경우 문자열로 변환
      const districtStr =
        typeof district === 'string'
          ? district
          : district?.districtsname || district || '';

      const option = document.createElement('option');
      option.value = districtStr;
      option.textContent = districtStr;
      districtSelect.appendChild(option);
      console.log('Added district option:', districtStr);
      console.log('Option value:', option.value);
      console.log('Option text:', option.textContent);
      console.log('Option element:', option);
    });

    // 옵션 추가 완료 후 선택된 값 설정
    if (selectedDistrictValue) {
      // 값 설정 함수
      const setValue = () => {
        const optionExists = Array.from(districtSelect.options).some(
          (option) => option.value === selectedDistrictValue
        );
        if (optionExists) {
          districtSelect.value = selectedDistrictValue;
          console.log(
            'District value set to:',
            selectedDistrictValue,
            'current value:',
            districtSelect.value
          );

          // 동/역 옵션 업데이트
          const regionSelect = document.getElementById('regionSelect');
          if (regionSelect && regionSelect.value) {
            updateDongStationOptions(regionSelect.value, selectedDistrictValue);
          }
          return true;
        }
        return false;
      };

      // 1. 옵션 추가 직후 바로 시도
      if (!setValue()) {
        // 2. requestAnimationFrame으로 재시도
        requestAnimationFrame(() => {
          if (!setValue()) {
            // 3. 짧은 지연 후 재시도
            setTimeout(() => {
              if (!setValue()) {
                // 4. 더 긴 지연 후 재시도
                setTimeout(() => {
                  setValue();
                }, 200);
              }
            }, 50);
          }
        });
      }

      // 5. 추가 보장: 여러 번 재시도 (다른 코드가 덮어쓸 수 있으므로)
      let retryCount = 0;
      const maxRetries = 10;
      const ensureValue = () => {
        if (districtSelect.value !== selectedDistrictValue) {
          const optionExists = Array.from(districtSelect.options).some(
            (option) => option.value === selectedDistrictValue
          );
          if (optionExists) {
            districtSelect.value = selectedDistrictValue;
            console.log('District value re-set to:', selectedDistrictValue);
            // 값이 설정되면 동/역 옵션도 업데이트
            const regionSelect = document.getElementById('regionSelect');
            if (regionSelect && regionSelect.value) {
              updateDongStationOptions(
                regionSelect.value,
                selectedDistrictValue
              );
            }
          }
        }
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(ensureValue, 100 * retryCount);
        }
      };
      setTimeout(ensureValue, 100);
    }
  } else {
    console.log('No district data found for region:', region);
  }

  // 아이콘 강제 표시 유지
  const districtBox = districtSelect.closest('.search-box');
  if (districtBox) {
    const icon = districtBox.querySelector('i');
    if (icon) {
      icon.style.display = 'inline-block';
      icon.style.visibility = 'visible';
      icon.style.opacity = '1';
    }
  }
}

// 동/역 옵션 업데이트 함수
function updateDongStationOptions(region, district) {
  const dongStationSelect = document.getElementById('dongStationSelect');
  if (!dongStationSelect) return;

  // 옵션 초기화
  dongStationSelect.innerHTML = '<option value="">동, 역 선택</option>';

  if (!region || !district) {
    dongStationSelect.disabled = true;
    dongStationSelect.style.opacity = '0.5';
    return;
  }

  // districtMap에서 동/역 데이터 찾기
  for (const [regionKey, regionData] of Object.entries(districtMap)) {
    if (regionData.regionName === region) {
      for (const [districtKey, districtData] of Object.entries(
        regionData.districts
      )) {
        // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
        const districtName =
          typeof districtData === 'string'
            ? districtData
            : districtData.districtsname;

        if (districtName === district) {
          // 새 구조인 경우 dongStations 사용
          if (typeof districtData === 'object' && districtData.dongStations) {
            for (const [dongKey, dongName] of Object.entries(
              districtData.dongStations
            )) {
              const option = document.createElement('option');
              option.value = dongKey;
              option.textContent = dongName;
              dongStationSelect.appendChild(option);
            }
            // 동/역 선택 활성화
            dongStationSelect.disabled = false;
            dongStationSelect.style.opacity = '1';
            return;
          }
        }
      }
      break;
    }
  }

  // 동/역 데이터가 없으면 비활성화
  dongStationSelect.disabled = true;
  dongStationSelect.style.opacity = '0.5';
}

// 지역별 검색 수행 (즉각 반응용)
function performLocationSearch() {
  if (!currentRegion) {
    // 지역이 선택되지 않은 경우 전체 표시
    displayMassageShops(massageShops);
    // 메인 페이지가 아닌 경우 "마사지"로 표시
    const isMainPage =
      window.location.pathname.includes('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '' ||
      /\/twon\/?$/i.test(window.location.pathname);
    const title = isMainPage ? '전체 마사지사이트 업체' : '전체 마사지 업체';
    updateResultsHeader(title, massageShops.length);
    return;
  }

  // 검색 결과 필터링
  let filteredShops;

  // 출장마사지는 구를 무시하고 지역만으로 검색
  if (currentFilter === 'outcall') {
    filteredShops = massageShops.filter(
      (shop) =>
        shopMatchesRegion(shop, currentRegion) &&
        (shop.type === 'outcall' ||
          shop.type === '출장마사지' ||
          isOutcallShop(shop))
    );
    // 출장마사지 선택 시 구 선택 초기화
    currentDistrict = '';
    districtSelect.value = '';
  } else if (currentDistrict) {
    // 지역 선택 + 세부지역: 같은 지역을 가까운 순으로
    filteredShops = massageShops.filter((shop) =>
      shopMatchesRegion(shop, currentRegion)
    );
    if (currentFilter === 'massage') {
      filteredShops = filteredShops.filter((shop) => isMassageType(shop));
    }
    filteredShops = sortShopsByProximity(filteredShops, currentDistrict);
    displayMassageShops(filteredShops, { preserveOrder: true });
    const title = `${currentRegion} ${currentDistrict}`;
    updateResultsHeader(title, filteredShops.length);
    return;
  } else {
    // 지역만 선택된 경우
    filteredShops = massageShops.filter((shop) =>
      shopMatchesRegion(shop, currentRegion)
    );
  }

  // 결과 표시
  displayMassageShops(filteredShops);

  // 결과 헤더 업데이트
  let title;
  if (currentFilter === 'outcall') {
    title = `${currentRegion} 출장마사지`;
  } else {
    title = currentDistrict
      ? `${currentRegion} ${currentDistrict}`
      : currentRegion;
  }
  updateResultsHeader(title, filteredShops.length);
}

// 지역별 검색 수행
function performSearch() {
  const selectedRegion = regionSelect.value;
  const selectedDistrict = districtSelect.value;

  if (!selectedRegion) {
    alert('지역을 선택해주세요.');
    return;
  }

  currentRegion = selectedRegion;
  currentDistrict = selectedDistrict;

  // 검색 결과 필터링
  let filteredShops;
  if (selectedDistrict) {
    // 지역 + 세부지역: 같은 지역을 가까운 순으로
    filteredShops = massageShops.filter((shop) =>
      shopMatchesRegion(shop, selectedRegion)
    );
    if (currentFilter === 'massage') {
      filteredShops = filteredShops.filter((shop) => isMassageType(shop));
    } else if (currentFilter === 'outcall') {
      filteredShops = filteredShops.filter((shop) => isOutcallType(shop));
    }
    if (currentFilter !== 'outcall') {
      filteredShops = sortShopsByProximity(filteredShops, selectedDistrict);
      displayMassageShops(filteredShops, { preserveOrder: true });
    } else {
      displayMassageShops(filteredShops);
    }
  } else {
    // 지역만 선택된 경우
    filteredShops = massageShops.filter((shop) =>
      shopMatchesRegion(shop, selectedRegion)
    );
    displayMassageShops(filteredShops);
  }

  // 결과 헤더 업데이트
  let title = selectedDistrict
    ? `${selectedRegion} ${selectedDistrict}`
    : selectedRegion;
  updateResultsHeader(title, filteredShops.length);
}

// 지역 선택 시 페이지 이동 함수
function handleRegionChange() {
  const selectedRegion = regionSelect.value;
  const selectedDistrict = districtSelect.value;

  if (!selectedRegion) return;

  // 지역 선택 시 구 옵션 업데이트
  updateDistrictOptions(selectedRegion);

  // 구가 선택된 경우 해당 구의 업체들을 필터링해서 표시
  if (selectedDistrict) {
    currentRegion = selectedRegion;
    currentDistrict = selectedDistrict;
    displayFilteredResults();
    return;
  }

  // 지역만 선택된 경우 해당 지역의 모든 업체들을 표시
  if (selectedRegion) {
    currentRegion = selectedRegion;
    currentDistrict = ''; // 구 선택 초기화

    // districtMap을 활용한 페이지 이동 로직
    // 현재 필터 유지
    let targetPage = '';
    for (const [key, value] of Object.entries(districtMap)) {
      if (value.regionName === selectedRegion) {
        // 필터가 있으면 필터 포함 페이지로 이동
        if (currentFilter && currentFilter !== 'all') {
          targetPage = `${key}-${currentFilter}.html`;
        } else {
          targetPage = `${key}.html`;
        }
        window.location.href = targetPage;
        return;
      }
    }

    // 구 옵션이 로드된 후 결과 표시 (fallback)
    setTimeout(() => {
      displayFilteredResults();
    }, 100);
    return;
  }
}

// 필터 버튼은 HTML에서 직접 링크로 처리됩니다
// 필터링된 결과 표시
function displayFilteredResults() {
  let filteredShops = massageShops;

  // window.currentFilter가 설정되어 있으면 우선 사용
  if (window.currentFilter && typeof window.currentFilter !== 'undefined') {
    currentFilter = window.currentFilter;
  }

  // 현재 필터 값 로그 출력 (디버깅용)
  console.log('displayFilteredResults - currentFilter:', currentFilter);
  console.log(
    'displayFilteredResults - window.currentFilter:',
    window.currentFilter
  );

  // footer-links 텍스트 업데이트
  updateFooterLinkText();

  // 지역 필터 적용 (복수 지역 표기 "서울,경기,인천" + 출장 서비스권역 지원)
  if (currentRegion) {
    filteredShops = filteredShops.filter((shop) =>
      shopMatchesRegion(shop, currentRegion)
    );
  }

  // 구 필터: 출장은 무시. 마사지/전체는 같은 지역을 가까운 순으로 보여주기 위해
  // 구로 하드컷하지 않고 아래에서 근접 정렬만 적용.
  const useProximitySort =
    !!currentDistrict && currentFilter !== 'outcall';

  // 타입 필터 적용
  if (currentFilter === 'massage') {
    // 마사지 계열만 (출장 제외): 마사지·스웨디시·타이·아로마·중국·발·스파 등
    filteredShops = filteredShops.filter((shop) => isMassageType(shop));

    // 국가별 필터 적용
    if (currentCountry && currentCountry !== 'overall') {
      filteredShops = filteredShops.filter((shop) => {
        if (shop.country) {
          return shop.country.includes(currentCountry);
        }
        // 기존 로직 유지 (하위 호환성)
        const countryMap = {
          korea: [
            'korean',
            'foot',
            '출장마사지',
            '마사지, 스웨디시',
            '마사지, 왁싱, 스웨디시',
          ],
          thai: ['thai'],
          china: ['foot', '마사지, 왁싱, 스웨디시'],
          russia: ['spa'],
          japan: ['spa', '출장마사지'],
        };
        return countryMap[currentCountry]?.includes(shop.type) || false;
      });
    }
  } else if (currentFilter === 'outcall') {
    // 출장마사지만
    filteredShops = filteredShops.filter((shop) => isOutcallType(shop));
  } else if (currentFilter === 'waxing') {
    // 왁싱 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 왁싱이 포함된 경우
      if (shop.type && shop.type.toLowerCase().includes('왁싱')) {
        return true;
      }
      // services에 왁싱이 포함된 경우
      if (
        shop.services &&
        shop.services.some((service) => {
          const serviceLower = service.toLowerCase();
          return (
            serviceLower.includes('왁싱') ||
            serviceLower.includes('waxing') ||
            serviceLower.includes('브라질리언')
          );
        })
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter === 'swedish') {
    // 스웨디시 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 스웨디시가 포함된 경우
      if (shop.type && shop.type.includes('스웨디시')) {
        return true;
      }
      // services에 스웨디시가 포함된 경우
      if (
        shop.services &&
        shop.services.some((service) => service.includes('스웨디시'))
      ) {
        return true;
      }
      return false;
    });

    // 국가별 필터 적용 (출장마사지는 한국, 일본에서 제공)
    if (currentCountry && currentCountry !== 'overall') {
      filteredShops = filteredShops.filter((shop) => {
        if (shop.country) {
          return shop.country.includes(currentCountry);
        }
        // 기존 로직 유지 (하위 호환성)
        const countryMap = {
          korea: [
            'korean',
            'foot',
            '출장마사지',
            '마사지, 스웨디시',
            '마사지, 왁싱, 스웨디시',
          ],
          thai: ['thai'],
          china: ['foot', '마사지, 왁싱, 스웨디시'],
          russia: ['spa'],
          japan: ['spa', '출장마사지'],
        };
        return countryMap[currentCountry]?.includes(shop.type) || false;
      });
    }
  } else if (currentFilter === 'thai') {
    // 타이마사지 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 타이마사지가 포함된 경우
      if (
        shop.type &&
        (shop.type.includes('타이') || shop.type.includes('thai'))
      ) {
        return true;
      }
      // services에 타이마사지가 포함된 경우
      if (
        shop.services &&
        shop.services.some(
          (service) => service.includes('타이') || service.includes('태국')
        )
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter === 'aroma') {
    // 아로마마사지 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 아로마가 포함된 경우
      if (shop.type && shop.type.includes('아로마')) {
        return true;
      }
      // services에 아로마가 포함된 경우
      if (
        shop.services &&
        shop.services.some(
          (service) => service.includes('아로마') || service.includes('에센셜')
        )
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter === 'chinese') {
    // 중국마사지 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 중국마사지가 포함된 경우
      if (shop.type && shop.type.includes('중국')) {
        return true;
      }
      // services에 중국마사지가 포함된 경우
      if (
        shop.services &&
        shop.services.some(
          (service) =>
            service.includes('중국') ||
            service.includes('지압') ||
            service.includes('경락')
        )
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter === 'foot') {
    // 발마사지 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 발마사지가 포함된 경우
      if (shop.type && (shop.type.includes('발') || shop.type === 'foot')) {
        return true;
      }
      // services에 발마사지가 포함된 경우
      if (
        shop.services &&
        shop.services.some(
          (service) =>
            service.includes('발') ||
            service.includes('족욕') ||
            service.includes('풋')
        )
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter === 'spa') {
    // 스파 타입
    filteredShops = filteredShops.filter((shop) => {
      // type에 스파가 포함된 경우
      if (shop.type && (shop.type.includes('스파') || shop.type === 'spa')) {
        return true;
      }
      // services에 스파가 포함된 경우
      if (
        shop.services &&
        shop.services.some(
          (service) =>
            service.includes('스파') ||
            service.includes('SPA') ||
            service.includes('스크럽') ||
            service.includes('VIP케어')
        )
      ) {
        return true;
      }
      return false;
    });
  } else if (currentFilter !== 'all') {
    filteredShops = filteredShops.filter((shop) => shop.type === currentFilter);
  }

  // 지역/구 필터 적용 (지역이 선택된 경우에만)
  // 출장마사지는 구를 무시하고 지역만으로 필터링
  // 주의: 이 부분은 이미 위에서 처리되었으므로 중복 필터링을 방지하기 위해 제거
  // (1194-1207줄에서 이미 district 필터가 적용됨)

  // 검색어 필터 적용 (2글자 이상인 경우)
  if (currentSearchQuery && currentSearchQuery.trim().length >= 2) {
    const searchTerm = currentSearchQuery.trim().toLowerCase();
    filteredShops = filteredShops.filter((shop) => {
      // 업체명 검색
      if (shop.name && shop.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      // 설명 검색
      if (
        shop.description &&
        shop.description.toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      // 서비스 검색
      if (shop.services && Array.isArray(shop.services)) {
        if (
          shop.services.some((service) =>
            service.toLowerCase().includes(searchTerm)
          )
        ) {
          return true;
        }
      }
      // 주소 검색
      if (shop.address && shop.address.toLowerCase().includes(searchTerm)) {
        return true;
      }
      if (
        shop.detailAddress &&
        shop.detailAddress.toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      // 지역/구 검색
      if (shop.region && shop.region.toLowerCase().includes(searchTerm)) {
        return true;
      }
      if (shop.district && shop.district.toLowerCase().includes(searchTerm)) {
        return true;
      }
      // 태그 검색
      if (shop.tags && Array.isArray(shop.tags)) {
        if (shop.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) {
          return true;
        }
      }
      // 키워드 검색
      if (shop.keywords && shop.keywords.toLowerCase().includes(searchTerm)) {
        return true;
      }
      return false;
    });
  }

  // 정적 HTML 카드가 있는지 확인
  // ※ 동적 렌더된 .massage-card 는 정적 카드로 취급하면 안 됨 (필터 재적용 실패 원인)
  const massageList = document.getElementById('massageList');
  const hasDynamicData =
    (Array.isArray(massageShops) && massageShops.length > 0) ||
    (typeof window !== 'undefined' &&
      Array.isArray(window.shopCardData) &&
      window.shopCardData.length > 0);
  const hasStaticCards =
    !hasDynamicData &&
    massageList &&
    massageList.children.length > 0 &&
    Array.from(massageList.children).some(
      (child) =>
        (child.classList && child.classList.contains('massage-card')) ||
        (child.querySelector && child.querySelector('.massage-card')) ||
        (child.tagName === 'A' && child.querySelector('.massage-card'))
    );

  if (hasStaticCards) {
    // 정적 HTML 카드가 있으면 검색 필터링만 적용
    filterStaticCards(currentSearchQuery);
  } else {
    // 세부지역 선택 시: 같은 지역 샵을 가까운 순으로 표시
    if (useProximitySort) {
      filteredShops = sortShopsByProximity(filteredShops, currentDistrict);
      displayMassageShops(filteredShops, { preserveOrder: true });
    } else {
      displayMassageShops(filteredShops);
    }
  }

  // 결과 헤더 업데이트
  // 메인 페이지가 아닌 경우 "마사지"로 표시
  const isMainPage =
    window.location.pathname.includes('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === '' ||
    /\/twon\/?$/i.test(window.location.pathname);
  let title = isMainPage ? '전체 마사지사이트 업체' : '전체 마사지 업체';

  // 검색어가 있으면 제목에 검색어 표시
  if (currentSearchQuery && currentSearchQuery.trim().length >= 2) {
    title = `"${currentSearchQuery}" 검색 결과`;
  }

  // 필터별 제목 설정
  if (currentFilter === 'massage') {
    if (currentCountry && currentCountry !== 'overall') {
      const countryNames = {
        korea: '한국',
        thai: '태국',
        china: '중국',
        russia: '러시아',
        japan: '일본',
      };
      title = `${countryNames[currentCountry]} 마사지`;
    } else {
      title = '마사지';
    }
  } else if (currentFilter === 'outcall') {
    if (currentCountry && currentCountry !== 'overall') {
      const countryNames = {
        korea: '한국',
        thai: '태국',
        china: '중국',
        russia: '러시아',
        japan: '일본',
      };
      title = `${countryNames[currentCountry]} 출장마사지`;
    } else {
      title = '출장마사지';
    }
  } else if (currentFilter === 'waxing') {
    title = '왁싱 업체';
  } else if (currentFilter === 'swedish') {
    title = '스웨디시 업체';
  } else if (currentFilter === 'thai') {
    title = '타이마사지 업체';
  } else if (currentFilter === 'aroma') {
    title = '아로마마사지 업체';
  } else if (currentFilter === 'chinese') {
    title = '중국마사지 업체';
  } else if (currentFilter === 'foot') {
    title = '발마사지 업체';
  } else if (currentFilter === 'spa') {
    title = '스파 업체';
  }

  // 테마 필터는 지역 정보 없이 제목만 표시, 다른 필터는 지역 정보 추가
  const themeFilters = [
    'waxing',
    'swedish',
    'thai',
    'aroma',
    'chinese',
    'foot',
    'spa',
  ];
  if (!themeFilters.includes(currentFilter)) {
    // 지역과 구 정보 추가
    if (currentRegion && currentDistrict) {
      title = `${currentRegion} ${currentDistrict} ${title}`;
    } else if (currentRegion) {
      title = `${currentRegion} ${title}`;
    }
  }

  // updateResultsHeader(title, filteredShops.length);
  updateResultsTitle();
}

// 주소에서 동 이름 추출
function extractDongFromAddress(address, detailAddress) {
  if (!address) return '';

  // 동 패턴 매칭 (예: 서귀동, 중문동, 한림동 등)
  const dongPatterns = [/([가-힣]+동)/, /([가-힣]+리)/, /([가-힣]+가)/];

  // 먼저 주소에서 찾기
  for (const pattern of dongPatterns) {
    const match = address.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // 주소에서 못 찾으면 detailAddress에서 찾기
  if (detailAddress) {
    for (const pattern of dongPatterns) {
      const match = detailAddress.match(pattern);
      if (match) {
        return match[1];
      }
    }
  }

  return '';
}

// 주소에서 지역 정보 추출 (구/시 + 동)
function extractLocationInfo(address, detailAddress) {
  if (!address) return '';

  // 구/시 패턴 매칭
  const guPattern = /([가-힣]+구)/;
  const siPattern = /([가-힣]+시)/;

  let location = '';

  // 구가 있는 경우
  const guMatch = address.match(guPattern);
  if (guMatch) {
    location = guMatch[1];
  }

  // 시가 있는 경우 (구가 없는 경우)
  const siMatch = address.match(siPattern);
  if (!location && siMatch) {
    location = siMatch[1];
  }

  // 동 정보 추가 (주소와 detailAddress 모두 확인)
  const dongName = extractDongFromAddress(address, detailAddress);
  if (dongName) {
    location = location ? `${location} ${dongName}` : dongName;
  }

  return location;
}

// 랜덤 거리 생성 (0.5km ~ 15km)
function generateRandomDistance() {
  const min = 0.5;
  const max = 15;
  const distance = Math.random() * (max - min) + min;
  return Math.round(distance * 10) / 10; // 소수점 첫째자리까지
}

// 업체명에서 동 추출하여 새로운 이름 생성
function createShopDisplayName(shop) {
  // 출장마사지: 지역 접두어 없이 업체명만 표시
  if (shop.type === '출장마사지' || shop.type === 'outcall') {
    return (shop.name || '').trim();
  }

  // shop.dong 필드가 있으면 우선 사용
  let dongName = shop.dong;

  // shop.dong이 없으면 주소에서 추출
  if (!dongName) {
    dongName = extractDongFromAddress(shop.address, shop.detailAddress);
  }

  // 동 이름이 있고 업체명에 포함되지 않은 경우 동 이름 추가
  if (dongName && !shop.name.includes(dongName)) {
    // 기존 업체명에서 "제주마사지", "제주도마사지" 등을 제거하고 간단하게
    let simpleName = shop.name
      .replace(/제주도?마사지\s*/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `${dongName} ${simpleName}`;
  }
  return shop.name;
}

// 로컬 국기 이미지 (images/national flag)
const FLAG_BASE_PATH = 'images/national flag';
const COUNTRY_FLAG_MAP = {
  korea: { src: `${FLAG_BASE_PATH}/한국.jpg`, alt: '한국 국기' },
  japan: { src: `${FLAG_BASE_PATH}/일본.jpg`, alt: '일본 국기' },
  thailand: { src: `${FLAG_BASE_PATH}/태국.jpg`, alt: '태국 국기' },
  china: { src: `${FLAG_BASE_PATH}/중국.jpg`, alt: '중국 국기' },
  russia: { src: `${FLAG_BASE_PATH}/러시아.jpg`, alt: '러시아 국기' },
  ukraine: { src: `${FLAG_BASE_PATH}/우크라이나국기.png`, alt: '우크라이나 국기' },
};

function parseShopCountries(country) {
  const keys = [];
  const add = (key) => {
    if (!keys.includes(key)) keys.push(key);
  };
  if (!country) {
    add('korea');
    return keys;
  }
  String(country)
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((part) => {
      if (part.includes('korea') || part.includes('한국')) add('korea');
      else if (part.includes('japan') || part.includes('일본')) add('japan');
      else if (
        part.includes('thailand') ||
        part.includes('thai') ||
        part.includes('태국')
      )
        add('thailand');
      else if (part.includes('china') || part.includes('중국')) add('china');
      else if (part.includes('russia') || part.includes('러시아')) add('russia');
      else if (part.includes('ukraine') || part.includes('우크라이나'))
        add('ukraine');
    });
  if (keys.length === 0) add('korea');
  // 기존 UI와 같이 한국 국기는 항상 포함
  if (!keys.includes('korea')) keys.unshift('korea');
  return keys;
}

function renderCountryFlagsHtml(country) {
  return parseShopCountries(country)
    .map((key) => {
      const flag = COUNTRY_FLAG_MAP[key];
      if (!flag) return '';
      return `<img src="${flag.src}" alt="${flag.alt}" class="flag-image" loading="lazy" onerror="this.style.display='none'">`;
    })
    .join('');
}
window.renderCountryFlagsHtml = renderCountryFlagsHtml;
window.parseShopCountries = parseShopCountries;

// 주소 표시용 정리 (출구/도보/역 부근 등 부가안내 제거)
function cleanDisplayAddress(address, shop) {
  let text = String(address || '').trim();
  if (!text) return '';

  if (
    shop &&
    (shop.type === '출장마사지' || shop.type === 'outcall') &&
    /(전\s*지역|전지역|,|\.|·)/.test(text) &&
    !/\d{1,4}-\d{1,4}/.test(text)
  ) {
    return text;
  }

  text = text
    .replace(
      /\s+[가-힣A-Za-z0-9]+역\s*\d*\s*번?\s*출구(?:\s*도보\s*\d+\s*분)?.*$/u,
      ''
    )
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*(부근|인근|근처).*$/u, '')
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*$/u, '')
    .replace(/\s*도보\s*\d+\s*분.*$/u, '')
    .replace(/\s*\([^)]*(출구|도보|주차|문의|부근|인근)[^)]*\)\s*$/u, '')
    .replace(/\s*(상세\s*주소\s*문의|주소\s*문의|위치\s*문의).*$/u, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return text || String(address || '').trim();
}
window.cleanDisplayAddress = cleanDisplayAddress;

// 업체 카드 생성
function createShopCard(shop) {
  const displayName = createShopDisplayName(shop);
  // 출장마사지의 경우 지역명만 표시
  let locationInfo;
  if (shop.type === '출장마사지') {
    locationInfo =
      extractDongFromAddress(shop.address, shop.detailAddress) ||
      shop.region ||
      '출장마사지';
  } else {
    // shop.district와 shop.dong 필드가 있으면 우선 사용
    if (shop.district && shop.dong) {
      locationInfo = `${shop.district} ${shop.dong}`;
    } else if (shop.district) {
      locationInfo = shop.district;
    } else {
      locationInfo = extractLocationInfo(shop.address, shop.detailAddress);
    }
  }
  const distance = generateRandomDistance();

  // 주소, 상세주소, 전화번호를 한 줄로 합치기
  const addressParts = [];
  const cleanedAddress = cleanDisplayAddress(shop.address, shop);
  const cleanedDetail = cleanDisplayAddress(shop.detailAddress, shop);
  if (cleanedAddress) addressParts.push(cleanedAddress);
  if (cleanedDetail && cleanedDetail !== cleanedAddress) {
    addressParts.push(cleanedDetail);
  }
  if (shop.phone) addressParts.push(shop.phone);
  const addressLine = addressParts.join(' | ');

  // 주소 정보 HTML 생성
  const addressHtml = addressLine
    ? `<div class="shop-address-info" style="font-size: 12px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;">
                        ${addressLine}
                    </div>`
    : '';

  const flagsHtml = renderCountryFlagsHtml(shop.country);

  return `
        <div class="massage-card" data-type="${
          shop.type
        }" onclick="goToDetail(${shop.id})">
            <div class="card-image">
                <img src="${
                  shop.image
                }" alt="${(shop.alt || displayName).replace(/"/g, '&quot;')}" class="shop-image"
                     title="${(shop.alt || displayName).replace(/"/g, '&quot;')}"
                     width="300" height="200"
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOazleWKoOi9vTwvdGV4dD48L3N2Zz4='; this.style.display='block';"
                     loading="lazy">
                <div class="image-overlay">
                    ${
                      getTypeName(shop)
                        ? `<div class="shop-type">${getTypeName(shop)}</div>`
                        : ''
                    }
                </div>
            </div>

            <div class="card-content">
                <div class="card-header">
                    <div class="shop-name-container">
                        <div class="shop-name">${displayName}</div>
                        <div class="shop-location-info">
                            <span class="shop-district">${locationInfo}</span>
                            <div class="location-flag">
                                ${flagsHtml}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-info">
                    <div class="info-item greeting">
                        <span>${getGreeting(shop)}</span>
                    </div>
                </div>

                <div class="card-footer" style="display: flex; justify-content: flex-start; align-items: center; gap: 12px; flex-wrap: nowrap; overflow: hidden;">
                    <div class="price-container" style="display: flex; align-items: center; gap: 8px; overflow: hidden; width: 100%; flex: 1; min-width: 0;">
                        <div class="price" style="flex-shrink: 0; white-space: nowrap;"><span class="price-label">최저가</span> ${
                          shop.price
                        }</div>
                        ${addressHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 타입 이름 반환
function getTypeName(shop) {
  // shop-card-data.js에서 showHealingShop 필드 확인
  if (shop.showHealingShop === false) return '';
  if (shop.hideHealingShop === true) return '';

  // typeLabel 필드가 있으면 사용
  if (shop.typeLabel !== undefined && shop.typeLabel !== null) {
    return shop.typeLabel || '';
  }

  return '힐링샵'; // 기본값
}

// 테마별 필터링 함수
function filterByType(selectedType) {
  // 모든 업체를 가져와서 선택된 테마와 일치하는 것만 필터링
  let filteredShops = massageShops;

  if (selectedType && selectedType !== 'all') {
    // 제주 지역에서 마사지/출장마사지 테마 클릭 시 해당 페이지로 이동
    if (selectedType === 'massage' && currentRegion === '제주') {
      window.location.href = 'jeju-massage.html';
      return;
    } else if (selectedType === 'outcall' && currentRegion === '제주') {
      window.location.href = 'jeju-outcall.html';
      return;
    }

    // 테마별 서비스 키워드 매핑
    const themeKeywords = {
      swedish: ['스웨디시', '스웨덴'],
      thai: ['타이마사지', '타이', '태국'],
      aroma: ['아로마', '아로마마사지', '에센셜오일'],
      waxing: ['왁싱', '제모'],
      chinese: ['중국마사지', '중국', '지압'],
      foot: ['발마사지', '족욕', '풋케어', '발'],
      spa: ['스파', 'SPA', '스크럽', 'VIP케어', '호텔식'],
    };

    const keywords = themeKeywords[selectedType];
    if (keywords) {
      filteredShops = massageShops.filter((shop) => {
        // 서비스 배열에서 키워드 검색
        if (shop.services && Array.isArray(shop.services)) {
          return shop.services.some((service) =>
            keywords.some((keyword) =>
              service.toLowerCase().includes(keyword.toLowerCase())
            )
          );
        }

        // 설명에서도 키워드 검색
        if (shop.description) {
          return keywords.some((keyword) =>
            shop.description.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        return false;
      });
    }
  }

  // 현재 지역/구: 세부지역이면 같은 지역을 가까운 순으로
  if (currentRegion) {
    filteredShops = filteredShops.filter((shop) =>
      shopMatchesRegion(shop, currentRegion)
    );
    if (currentDistrict) {
      filteredShops = sortShopsByProximity(filteredShops, currentDistrict);
      displayMassageShops(filteredShops, { preserveOrder: true });
      updateResultsHeader('테마별 업체', filteredShops.length);
      return;
    }
  }

  // 결과 표시
  displayMassageShops(filteredShops);
  updateResultsHeader('테마별 업체', filteredShops.length);
}

// 인사말 반환 (업체별 동적 생성)
function getGreeting(shop) {
  // shop-card-data.js에서 greeting 필드가 있으면 우선 사용
  if (shop.greeting && shop.greeting.trim() !== '') {
    return shop.greeting;
  }
  // 관리사 나이 정보 추출
  let ageGroup = '20대';
  if (shop.staffInfo) {
    const ageMatches = shop.staffInfo.match(/\((\d+)\)/g);
    if (ageMatches && ageMatches.length > 0) {
      const ages = ageMatches.map((match) =>
        parseInt(match.replace(/[()]/g, ''))
      );
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);

      if (minAge >= 20 && maxAge <= 25) {
        ageGroup = '20대 초반';
      } else if (minAge >= 20 && maxAge <= 29) {
        ageGroup = '20대';
      } else if (minAge >= 30 && maxAge <= 39) {
        ageGroup = '30대';
      } else if (minAge >= 20 && maxAge <= 39) {
        ageGroup = '20~30대';
      }
    }
  }

  // 업체 타입별 다양한 인사글 템플릿
  const greetingTemplates = {
    korean: [
      `${ageGroup} 전문 관리사의 정성 케어`,
      `${ageGroup} 숙련된 힐링 터치`,
      `안녕하세요. 저희는 사랑하는 고객님을 위한 서비스를 제공합니다.`,
      `${ageGroup} 전문가의 맞춤 힐링`,
      `${ageGroup} 관리사의 감성 케어`,
    ],
    thai: [
      `${ageGroup} 타이 전문가의 특별한 케어`,
      `정통 타이마사지 ${ageGroup} 전문가`,
      `${ageGroup} 타이 마스터의 섬세한 터치`,
      `프리미엄 타이 ${ageGroup} 관리사`,
      `${ageGroup} 타이 전문가가 함께합니다`,
    ],
    foot: [
      `${ageGroup} 발 전문가의 시원한 케어`,
      `발 건강 ${ageGroup} 전문 관리사`,
      `${ageGroup} 발마사지 전문가 대기`,
      `시원한 발 케어 ${ageGroup} 전문가`,
      `${ageGroup} 발 관리 전문가의 손길`,
    ],
    spa: [
      `${ageGroup} 스파 전문가의 럭셔리 케어`,
      `프리미엄 스파 ${ageGroup} 전문 관리사`,
      `${ageGroup} 스파 마스터의 특별한 힐링`,
      `럭셔리 스파 ${ageGroup} 전문가`,
      `${ageGroup} 관리사의 프리미엄 스파`,
    ],
    outcall: [
      `${ageGroup} 전문가가 방문해 드립니다`,
      `${ageGroup} 출장 전문 관리사 대기`,
      `편안한 공간에서 ${ageGroup} 관리사 서비스`,
      `${ageGroup} 프리미엄 출장 케어`,
      `${ageGroup} 관리사 신속 방문 가능`,
    ],
    waxing: [
      `${ageGroup} 왁싱 전문가의 세심한 케어`,
      `프리미엄 왁싱 ${ageGroup} 전문가`,
      `${ageGroup} 왁싱 마스터의 꼼꼼한 관리`,
      `${ageGroup} 전문가의 위생적인 왁싱`,
      `${ageGroup} 왁싱 전문 관리사 대기`,
    ],
  };

  // 업체 타입에 맞는 인사글 선택
  const templates = greetingTemplates[shop.type] || greetingTemplates['korean'];

  // 업체 ID를 기반으로 일관된 인사글 선택 (랜덤처럼 보이지만 고정)
  const index = shop.id % templates.length;
  return templates[index];
}

// 결과 헤더 업데이트
function updateResultsHeader(title, count) {
  // "전체" 문자 제거
  title = title.replace(/\s*전체\s*/g, '');
  // title 뒤에 " 추천 BEST 샵" 추가
  if (title && !title.includes('추천 BEST')) {
    resultsTitle.textContent = `${title} 추천 BEST 샵`;
  } else {
    resultsTitle.textContent = title;
  }
  resultsCount.textContent = `총 ${count}개`;
}

// 테마별 resultsTitle 업데이트
function updateResultsTitleByTheme(selectedTheme) {
  const themeNames = {
    all: '전체',
    swedish: '스웨디시',
    thai: '타이마사지',
    aroma: '아로마마사지',
    waxing: '왁싱',
    chinese: '중국마사지',
    foot: '발마사지',
    spa: '스파',
  };

  const resultsTitle = document.getElementById('resultsTitle');
  if (resultsTitle) {
    const themeName = themeNames[selectedTheme] || selectedTheme;

    if (selectedTheme === 'all') {
      // 전체 선택 시 기본 제목
      const isMainPage =
        window.location.pathname.includes('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname === '' ||
        /\/twon\/?$/i.test(window.location.pathname);
      const baseTitle = isMainPage
        ? '전체 마사지사이트 업체'
        : '전체 마사지 업체';
      resultsTitle.textContent = `${baseTitle} 추천 BEST 샵`;
    } else {
      // 테마 선택 시 "스웨디시 업체 추천 BEST 샵" 형식
      resultsTitle.textContent = `${themeName} 업체 추천 BEST 샵`;
    }
  }
}

// 전화 걸기
function callShop(phoneNumber) {
  if (confirm(`전화를 걸까요?\n${phoneNumber}`)) {
    window.location.href = `tel:${phoneNumber}`;
  }
}

// 상세 페이지로 이동 (동적 detail.html)
function goToDetail(shopId) {
  window.location.href = `detail.html?id=${shopId}`;
}

// 스크롤 애니메이션
function observeCards() {
  const cards = document.querySelectorAll('.massage-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// 검색 결과 표시 후 애니메이션 적용 (최적화됨)
function displayMassageShopsWithAnimation(shops) {
  displayMassageShops(shops);
  // 즉시 애니메이션 적용 (setTimeout 제거)
  observeCards();
}

// 빈 상태 표시
function displayEmptyState() {
  massageList.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-map-marker-alt"></i>
            <h3>지역을 선택해주세요</h3>
            <p>원하는 지역과 구를 선택하여<br>마사지 업체를 검색해보세요.</p>
        </div>
    `;
  updateResultsHeader('마사지 업체 검색', 0);
}

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 업체 정렬 함수
function sortShops(shops) {
  // showHealingShop 값에 따라 그룹 분리
  const healingShops = shops.filter((shop) => shop.showHealingShop === true);
  const nonHealingShops = shops.filter((shop) => shop.showHealingShop !== true);

  // 각 그룹 내에서 랜덤 정렬
  const shuffledHealing = shuffleArray(healingShops);
  const shuffledNonHealing = shuffleArray(nonHealingShops);

  // true 그룹을 상단에, false 그룹을 하단에 배치
  return [...shuffledHealing, ...shuffledNonHealing];
}

// 정적 HTML 카드 정렬 실행 여부 플래그 (한 번만 실행되도록)
let staticCardsSorted = false;

// 정적 HTML 카드 재정렬 함수
function sortStaticCards() {
  // 이미 정렬되었으면 건너뛰기
  if (staticCardsSorted) {
    return;
  }

  // 동적 데이터 사용 중이면 정적 재정렬 금지 (선택구 우선 정렬 유지)
  if (
    (Array.isArray(massageShops) && massageShops.length > 0) ||
    (typeof window !== 'undefined' &&
      Array.isArray(window.shopCardData) &&
      window.shopCardData.length > 0)
  ) {
    staticCardsSorted = true;
    return;
  }

  // massageList가 존재하는지 확인 (DOM이 준비되지 않았을 수 있음)
  const massageList = document.getElementById('massageList');
  if (!massageList || massageList.children.length === 0) {
    console.log('sortStaticCards: massageList가 없거나 비어있음');
    return;
  }

  // 초기에 카드를 숨김 (렌더링 전 정렬을 위해) - CSS에서 이미 숨김 처리됨
  massageList.style.opacity = '0';
  massageList.style.visibility = 'hidden';

  // 모든 카드 요소 수집 (<a> 태그 또는 <div> 태그)
  const cards = Array.from(massageList.children).filter((child) => {
    const hasCard =
      (child.classList && child.classList.contains('massage-card')) ||
      (child.querySelector && child.querySelector('.massage-card')) ||
      (child.tagName === 'A' && child.querySelector('.massage-card'));
    return hasCard;
  });

  if (cards.length === 0) {
    console.log('sortStaticCards: 카드를 찾을 수 없음');
    return;
  }

  console.log(`sortStaticCards: ${cards.length}개 카드 발견`);

  // 파일명에서 동/역 이름 추출
  const currentFileName = window.location.pathname.split('/').pop();
  const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);
  const targetDongStation = detectedInfo.dongStation || '';

  console.log(`sortStaticCards: 파일명에서 추출한 동/역: ${targetDongStation}`);

  // 카드에서 동 이름 추출 함수
  function extractDongFromCard(card) {
    const massageCard = card.classList.contains('massage-card')
      ? card
      : card.querySelector('.massage-card');

    if (!massageCard) return '';

    // shop-name에서 추출 (예: "논현동 5월스파")
    const shopNameEl = massageCard.querySelector('.shop-name');
    if (shopNameEl) {
      const shopName = shopNameEl.textContent.trim();
      const dongMatch = shopName.match(/([가-힣]+동)/);
      if (dongMatch) {
        return dongMatch[1];
      }
    }

    // shop-district에서 추출 (예: "강남구 논현동")
    const shopDistrictEl = massageCard.querySelector('.shop-district');
    if (shopDistrictEl) {
      const shopDistrict = shopDistrictEl.textContent.trim();
      const dongMatch = shopDistrict.match(/([가-힣]+동)/);
      if (dongMatch) {
        return dongMatch[1];
      }
    }

    // shop-address-info에서 추출 (예: "서울 강남구 논현동 279-67")
    const shopAddressEl = massageCard.querySelector('.shop-address-info');
    if (shopAddressEl) {
      const shopAddress = shopAddressEl.textContent.trim();
      const dongMatch = shopAddress.match(/([가-힣]+동)/);
      if (dongMatch) {
        return dongMatch[1];
      }
    }

    return '';
  }

  // 각 카드의 showHealingShop 값과 동 이름 확인
  const cardData = cards.map((card) => {
    // massage-card 요소 찾기
    const massageCard = card.classList.contains('massage-card')
      ? card
      : card.querySelector('.massage-card');

    if (!massageCard) {
      console.log('sortStaticCards: massage-card 요소를 찾을 수 없음', card);
      return { card, showHealingShop: false, dong: '' };
    }

    // data-show-healing-shop 속성에서 값 확인 (우선순위 1)
    let isHealingShop = false;
    const dataAttr = massageCard.getAttribute('data-show-healing-shop');
    if (dataAttr !== null) {
      isHealingShop = dataAttr === 'true' || dataAttr === 'True';
    } else {
      // data 속성이 없으면 shop-type 요소에서 "힐링샵" 텍스트 확인 (하위 호환성)
      const shopTypeElement = massageCard.querySelector('.shop-type');
      isHealingShop =
        shopTypeElement &&
        shopTypeElement.textContent.trim().includes('힐링샵');
    }

    // 카드에서 동 이름 추출
    const cardDong = extractDongFromCard(card);

    return { card, showHealingShop: isHealingShop, dong: cardDong };
  });

  // 동/역 이름이 있고 카드에서 추출된 동 이름과 매칭되는 경우
  if (targetDongStation) {
    // 논현동 카드와 나머지 카드 분리
    const cardsWithDong = cardData.filter((item) => item.dong === targetDongStation);
    const cardsWithoutDong = cardData.filter((item) => item.dong !== targetDongStation);

    console.log(
      `sortStaticCards: ${targetDongStation} 매칭: ${cardsWithDong.length}개, 나머지: ${cardsWithoutDong.length}개`
    );

    // 논현동 카드 내에서 힐링샵/일반 분리
    const healingWithDong = cardsWithDong.filter((item) => item.showHealingShop === true);
    const nonHealingWithDong = cardsWithDong.filter((item) => item.showHealingShop !== true);

    // 나머지 카드 내에서 힐링샵/일반 분리
    const healingWithoutDong = cardsWithoutDong.filter((item) => item.showHealingShop === true);
    const nonHealingWithoutDong = cardsWithoutDong.filter((item) => item.showHealingShop !== true);

    console.log(
      `sortStaticCards: ${targetDongStation} - 힐링샵: ${healingWithDong.length}개, 일반: ${nonHealingWithDong.length}개`
    );
    console.log(
      `sortStaticCards: 나머지 - 힐링샵: ${healingWithoutDong.length}개, 일반: ${nonHealingWithoutDong.length}개`
    );

    // 각 그룹 내에서 랜덤 정렬
    const shuffledHealingWithDong = shuffleArray(healingWithDong);
    const shuffledNonHealingWithDong = shuffleArray(nonHealingWithDong);
    const shuffledHealingWithoutDong = shuffleArray(healingWithoutDong);
    const shuffledNonHealingWithoutDong = shuffleArray(nonHealingWithoutDong);

    // 카드 제거
    cards.forEach((card) => card.remove());

    // 정렬 순서: 논현동+힐링샵 → 나머지+힐링샵 → 논현동+일반 → 나머지+일반
    const sortedCards = [
      ...shuffledHealingWithDong,
      ...shuffledHealingWithoutDong,
      ...shuffledNonHealingWithDong,
      ...shuffledNonHealingWithoutDong,
    ];

    sortedCards.forEach((item) => {
      massageList.appendChild(item.card);
    });

    // 정렬 완료 플래그 설정
    staticCardsSorted = true;

    // 정렬 완료 후 카드 표시 (렌더링 전 정렬 완료)
    massageList.classList.add('sorted');
    massageList.style.opacity = '1';
    massageList.style.visibility = 'visible';

    console.log(
      `✅ 정적 HTML 카드 ${sortedCards.length}개 재정렬 완료 (${targetDongStation}: ${cardsWithDong.length}개 최상단)`
    );
  } else {
    // 동/역 이름이 없으면 기존 로직 (showHealingShop 기준만)
    // showHealingShop: true인 항목과 false인 항목 분리
    const healingCards = cardData.filter((item) => item.showHealingShop === true);
    const nonHealingCards = cardData.filter(
      (item) => item.showHealingShop !== true
    );

    console.log(
      `sortStaticCards: 힐링샵 ${healingCards.length}개, 일반 ${nonHealingCards.length}개`
    );

    // 각 그룹 내에서 랜덤 정렬 (새 배열 반환)
    const shuffledHealing = shuffleArray(healingCards);
    const shuffledNonHealing = shuffleArray(nonHealingCards);

    // 카드 제거
    cards.forEach((card) => card.remove());

    // 정렬된 순서로 다시 추가 (true 그룹 먼저, false 그룹 나중)
    const sortedCards = [...shuffledHealing, ...shuffledNonHealing];
    sortedCards.forEach((item) => {
      massageList.appendChild(item.card);
    });

    // 정렬 완료 플래그 설정
    staticCardsSorted = true;

    // 정렬 완료 후 카드 표시 (렌더링 전 정렬 완료)
    massageList.classList.add('sorted');
    massageList.style.opacity = '1';
    massageList.style.visibility = 'visible';

    console.log(
      `✅ 정적 HTML 카드 ${sortedCards.length}개 재정렬 완료 (힐링샵: ${healingCards.length}개, 일반: ${nonHealingCards.length}개)`
    );
  }
}

// 정적 HTML 카드 검색 필터링 함수
function filterStaticCards(searchQuery) {
  const massageList = document.getElementById('massageList');
  if (!massageList) return;

  // 모든 카드 요소 수집
  const cards = Array.from(massageList.children).filter((child) => {
    return (
      (child.classList && child.classList.contains('massage-card')) ||
      (child.querySelector && child.querySelector('.massage-card')) ||
      (child.tagName === 'A' && child.querySelector('.massage-card'))
    );
  });

  if (cards.length === 0) return;

  const searchTerm = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // 검색어가 없으면 모든 카드 표시
  if (!searchTerm || searchTerm.length < 2) {
    cards.forEach((card) => {
      card.style.display = '';
    });
    return;
  }

  // 각 카드의 텍스트 내용 확인
  cards.forEach((card) => {
    const massageCard = card.classList.contains('massage-card')
      ? card
      : card.querySelector('.massage-card');

    if (!massageCard) {
      card.style.display = 'none';
      return;
    }

    // 카드의 모든 텍스트 내용 수집
    const cardText = massageCard.textContent || massageCard.innerText || '';
    const cardTextLower = cardText.toLowerCase();

    // 검색어와 매칭되는지 확인
    const matches = cardTextLower.includes(searchTerm);

    // 매칭되면 표시, 아니면 숨김
    card.style.display = matches ? '' : 'none';
  });
}

// 업체 목록 표시 (애니메이션 포함) - 항상 shopCardData 기반 동적 렌더
function displayMassageShops(shops, options = {}) {
  const listEl = document.getElementById('massageList') || massageList;
  if (!listEl) return;

  if (!shops || shops.length === 0) {
    listEl.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>검색 결과가 없습니다</h3>
                <p>다른 지역이나 필터를 선택해보세요.</p>
            </div>
        `;
    listEl.classList.add('sorted');
    listEl.style.opacity = '1';
    listEl.style.visibility = 'visible';
    return;
  }

  // 세부지역이 있으면: 선택 구 업체를 무조건 최상단 → 그 아래 가까운 순
  // (호출부에서 preserveOrder를 빼먹어도 순서가 깨지지 않도록 여기서 강제)
  const districtForSort =
    options.district ||
    currentDistrict ||
    (typeof window !== 'undefined' ? window.currentDistrict : '') ||
    '';
  const skipProximity =
    options.skipProximity === true ||
    currentFilter === 'outcall' ||
    (typeof window !== 'undefined' && window.currentFilter === 'outcall');

  let sortedShops;
  if (districtForSort && !skipProximity && typeof sortShopsByProximity === 'function') {
    sortedShops = sortShopsByProximity([...shops], districtForSort);
  } else if (options.preserveOrder) {
    sortedShops = [...shops];
  } else {
    sortedShops = sortShops([...shops]);
  }

  listEl.innerHTML = sortedShops
    .map((shop) => createShopCard(shop))
    .join('');

  // CSS .massage-list 기본이 opacity:0 이라 반드시 표시 처리
  listEl.classList.add('sorted');
  listEl.style.opacity = '1';
  listEl.style.visibility = 'visible';

  // 카드 애니메이션 적용 (즉시 실행)
  observeCards();

  // 스크롤 이벤트 리스너 - 국가별 마사지 섹션 숨기기
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    // 스크롤이 발생하면 국가별 마사지 섹션들을 숨김
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      const massageCountryFilterSection = document.getElementById(
        'massageCountryFilterSection'
      );
      const outcallCountryFilterSection = document.getElementById(
        'outcallCountryFilterSection'
      );

      if (
        massageCountryFilterSection &&
        massageCountryFilterSection.style.display !== 'none'
      ) {
        massageCountryFilterSection.style.display = 'none';
      }
      if (
        outcallCountryFilterSection &&
        outcallCountryFilterSection.style.display !== 'none'
      ) {
        outcallCountryFilterSection.style.display = 'none';
      }
    }, 100); // 100ms 지연 후 실행
  });
}

// 회사소개 모달 열기
function openAboutModal(event) {
  event.preventDefault();
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

// 이용약관 모달 열기
function openTermsModal(event) {
  event.preventDefault();
  const modal = document.getElementById('termsModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

// 현재 필터 상태 가져오기
function getCurrentFilter() {
  const activeFilter = document.querySelector('.filter-btn.active');
  return activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
}

// footer-links 상세정보 텍스트 업데이트 (districtMap 활용)
function updateFooterLinkText() {
  const footerLink = document.querySelector(
    '.footer-link[onclick*="openDetailsModal"]'
  );
  if (!footerLink) return;

  let titleText = '상세정보';

  // 파일명에서 지역, 세부지역, 동/역 정보 추출
  const currentFileName = window.location.pathname.split('/').pop();
  const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);

  // 동/역 선택값 확인 (우선순위: 감지된 정보 > 선택 박스)
  let dongStation = detectedInfo.dongStation || '';
  const dongStationSelect = document.getElementById('dongStationSelect');
  if (!dongStation && dongStationSelect && dongStationSelect.value) {
    // districtMap에서 동/역 이름 찾기
    const districtMap = window.districtMap || {};
    const regionData =
      districtMap[
        detectedInfo.region
          ? Object.keys(districtMap).find(
              (k) => districtMap[k].regionName === detectedInfo.region
            )
          : ''
      ];
    if (regionData && detectedInfo.district) {
      const districtKey = Object.keys(regionData.districts).find((k) => {
        const d = regionData.districts[k];
        return (
          (typeof d === 'string' ? d : d.districtsname) ===
          detectedInfo.district
        );
      });
      if (
        districtKey &&
        regionData.districts[districtKey] &&
        typeof regionData.districts[districtKey] === 'object'
      ) {
        dongStation =
          regionData.districts[districtKey].dongStations?.[
            dongStationSelect.value
          ] || '';
      }
    }
  }

  // currentRegion, currentDistrict, currentFilter 변수 활용
  const themeNames = {
    swedish: '스웨디시',
    thai: '타이마사지',
    aroma: '아로마마사지',
    waxing: '왁싱',
    chinese: '중국마사지',
    foot: '발마사지',
    spa: '스파',
  };

  let region =
    detectedInfo.region ||
    (typeof currentRegion !== 'undefined' ? currentRegion : '');
  let district =
    detectedInfo.district ||
    (typeof currentDistrict !== 'undefined' ? currentDistrict : '');
  let filter =
    detectedInfo.filter ||
    (typeof currentFilter !== 'undefined' ? currentFilter : 'all');

  if (region) {
    let filterType = '마사지사이트';

    // 테마 필터 확인
    if (themeNames[filter]) {
      filterType = themeNames[filter];
    } else if (filter === 'massage') {
      filterType = '마사지';
    } else if (filter === 'outcall') {
      filterType = '출장마사지';
    }

    // 동/역이 있으면 "세부지역 동/역" 형식, 없으면 기존 형식
    if (dongStation && district) {
      titleText = `${district} ${dongStation}${filterType}정보`;
    } else if (region && district) {
      titleText = `${region} ${district}${filterType}정보`;
    } else if (district) {
      titleText = `${district} ${filterType}정보`;
    } else if (region) {
      titleText = `${region} ${filterType}정보`;
    } else {
      titleText = `${filterType}정보`;
    }
  } else {
    // 지역 정보가 없는 경우
    // spa.html 같은 경우 파일명으로 확인
    const fileName = window.location.pathname.split('/').pop();
    if (
      fileName === 'spa.html' &&
      (!filter || window.currentFilter === 'spa')
    ) {
      titleText = '스파정보';
    } else if (themeNames[filter]) {
      titleText = `${themeNames[filter]}정보`;
    } else if (filter === 'massage') {
      titleText = '마사지정보';
    } else if (filter === 'outcall') {
      titleText = '출장마사지정보';
    } else {
      titleText = '마사지사이트정보';
    }
  }

  footerLink.textContent = titleText;
}

// 파일명에서 지역, 세부지역, 동/역, 필터 자동 감지 함수
function detectRegionAndDistrictFromFilename(filename) {
  try {
    const result = {
      region: '',
      district: '',
      dongStation: '',
      dongStationKey: '',
      filter: '',
    };

    if (!filename) return result;

    // .html 제거
    const nameWithoutExt = filename.replace('.html', '');
    const parts = nameWithoutExt.split('-');

    // window.districtMap 사용 (중앙화된 지역 매핑)
    const districtMap = window.districtMap || {};

    // 필터 키워드
    const filterKeywords = [
      'massage',
      'outcall',
      'swedish',
      'thai',
      'aroma',
      'waxing',
      'chinese',
      'foot',
      'spa',
    ];

    // 첫 번째 부분이 지역 키인지 확인
    if (districtMap[parts[0]]) {
      const regionData = districtMap[parts[0]];
      result.region = regionData.regionName;

      // 두 번째 부분이 세부지역인지 필터인지 확인
      if (parts.length >= 2) {
        if (regionData.districts[parts[1]]) {
          // 세부지역인 경우
          const districtData = regionData.districts[parts[1]];
          // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
          result.district =
            typeof districtData === 'string'
              ? districtData
              : districtData.districtsname || districtData;

          // 세 번째 부분부터 동/역 키 추출
          // 예: seoul-gangnam-yeoksam-dong-massage.html
          // parts[0]=seoul, parts[1]=gangnam, parts[2]=yeoksam, parts[3]=dong, parts[4]=massage
          let dongParts = [];
          let filterIndex = -1;

          for (let i = 2; i < parts.length; i++) {
            if (filterKeywords.includes(parts[i])) {
              filterIndex = i;
              result.filter = parts[i];
              break;
            } else {
              dongParts.push(parts[i]);
            }
          }

          // 동/역 키와 이름 추출
          if (dongParts.length > 0) {
            result.dongStationKey = dongParts.join('-');

            // districtMap에서 동/역 이름 찾기
            if (typeof districtData === 'object' && districtData.dongStations) {
              result.dongStation =
                districtData.dongStations[result.dongStationKey] || '';
            }
          }
        } else if (filterKeywords.includes(parts[1])) {
          // 필터인 경우 (세부지역 없음)
          result.filter = parts[1];
        }
      }
    } else {
      // 기본 테마 페이지인 경우 (예: swedish.html, thai.html 등)
      if (filterKeywords.includes(parts[0])) {
        result.filter = parts[0];
      }
    }

    return result;
  } catch (error) {
    console.error('detectRegionAndDistrictFromFilename 오류:', error);
    return {
      region: '',
      district: '',
      dongStation: '',
      dongStationKey: '',
      filter: '',
    };
  }
}

// 상세정보 모달 열기
function openDetailsModal(event) {
  try {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('openDetailsModal 함수 호출됨');

    const modal = document.getElementById('detailsModal');
    if (!modal) {
      console.error('detailsModal을 찾을 수 없습니다.');
      alert('모달을 찾을 수 없습니다. 페이지를 새로고침해주세요.');
      return;
    }

    console.log('모달 요소 찾음:', modal);

    // 현재 페이지의 지역과 마사지 타입 정보 가져오기
    let currentFilter = 'all';

    // 파일명에서 필터 정보 추출
    const currentPage = window.location.pathname
      .split('/')
      .pop()
      .replace('.html', '');
    const themeFilters = {
      swedish: 'swedish',
      thai: 'thai',
      aroma: 'aroma',
      waxing: 'waxing',
      chinese: 'chinese',
      foot: 'foot',
      spa: 'spa',
      massage: 'massage',
      outcall: 'outcall',
    };

    if (themeFilters[currentPage]) {
      currentFilter = themeFilters[currentPage];
    } else {
      try {
        currentFilter = getCurrentFilter ? getCurrentFilter() : 'all';
      } catch (e) {
        console.warn('getCurrentFilter 오류:', e);
        currentFilter = 'all';
      }
    }

    // 전역 변수에서도 확인
    if (typeof window.currentFilter !== 'undefined' && window.currentFilter) {
      currentFilter = window.currentFilter;
    }

    // 파일명에서 지역과 세부지역 자동 감지
    const currentFileName = window.location.pathname.split('/').pop();
    const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);

    // 현재 지역과 세부지역 정보 가져오기 (우선순위: 감지된 정보 > 전역 변수 > 선택 박스)
    let region =
      detectedInfo.region ||
      (typeof currentRegion !== 'undefined' ? currentRegion : '');
    let district =
      detectedInfo.district ||
      (typeof currentDistrict !== 'undefined' ? currentDistrict : '');

    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const dongStationSelect = document.getElementById('dongStationSelect');

    // 감지된 정보가 없으면 선택 박스에서 가져오기
    if (!region && regionSelect) {
      region =
        regionSelect.value ||
        regionSelect.options[regionSelect.selectedIndex]?.text ||
        '';
      if (region === '지역을 선택하세요') region = '';
    }
    if (!district && districtSelect) {
      district =
        districtSelect.value ||
        districtSelect.options[districtSelect.selectedIndex]?.text ||
        '';
      if (district === '세부 지역을 선택하세요') district = '';
    }

    // 동/역 정보 가져오기
    let dongStation = detectedInfo.dongStation || '';
    let dongStationKey = detectedInfo.dongStationKey || '';

    if (!dongStation && dongStationSelect && dongStationSelect.value) {
      dongStationKey = dongStationSelect.value;
      // districtMap에서 동/역 이름 찾기
      const districtMap = window.districtMap || {};
      if (region && district) {
        const regionKey = Object.keys(districtMap).find(
          (k) => districtMap[k].regionName === region
        );
        if (regionKey && districtMap[regionKey].districts) {
          const districtKey = Object.keys(
            districtMap[regionKey].districts
          ).find((k) => {
            const d = districtMap[regionKey].districts[k];
            return (typeof d === 'string' ? d : d.districtsname) === district;
          });
          if (
            districtKey &&
            districtMap[regionKey].districts[districtKey] &&
            typeof districtMap[regionKey].districts[districtKey] === 'object'
          ) {
            dongStation =
              districtMap[regionKey].districts[districtKey].dongStations?.[
                dongStationKey
              ] || '';
          }
        }
      }
    }

    // 감지된 필터가 있으면 사용
    if (detectedInfo.filter) {
      currentFilter = detectedInfo.filter;
    }

    // 모달 제목 설정
    const modalHeader = modal.querySelector('.modal-header h2');
    if (modalHeader) {
      modalHeader.textContent = '서비스 필터 전체 보기';
    }

    // 필터 링크 생성
    let filterLinks = '';
    try {
      if (typeof generateFilterLinks === 'function') {
        filterLinks = generateFilterLinks(
          currentFilter,
          region,
          district,
          dongStation,
          dongStationKey
        );
      } else {
        console.error('generateFilterLinks 함수를 찾을 수 없습니다.');
        filterLinks = '<p>필터 링크를 생성할 수 없습니다.</p>';
      }
    } catch (e) {
      console.error('generateFilterLinks 오류:', e);
      filterLinks = '<p>필터 링크 생성 중 오류가 발생했습니다.</p>';
    }

    // 모달 본문 업데이트
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="terms-section">
          <h3>서비스 필터 전체 보기</h3>
          <div class="filter-links-container" style="margin-top: 20px;">
            ${filterLinks}
          </div>
        </div>
      `;
    }

    // 모달 표시 - 여러 방법으로 시도
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.alignItems = 'flex-start';
    modal.style.justifyContent = 'center';
    modal.style.padding = '20px';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.6)';
    modal.style.zIndex = '10000';
    document.body.style.overflow = 'hidden';

    console.log('모달 표시 완료:', {
      modal: modal,
      hasActiveClass: modal.classList.contains('active'),
      display: window.getComputedStyle(modal).display,
      zIndex: window.getComputedStyle(modal).zIndex,
    });
  } catch (error) {
    console.error('openDetailsModal 오류:', error);
    alert('모달을 열 수 없습니다: ' + error.message);
  }
}

// 전역 스코프에서 접근 가능하도록 window 객체에 할당
if (typeof window !== 'undefined') {
  window.openDetailsModal = openDetailsModal;
}

// 필터 링크 생성 함수
function generateFilterLinks(
  excludeFilter,
  region,
  district,
  dongStation = '',
  dongStationKey = ''
) {
  try {
    // 모든 필터 정의 (총 8개)
    const allFilters = [
      { key: 'massage', name: '마사지' },
      { key: 'outcall', name: '출장마사지' },
      { key: 'swedish', name: '스웨디시' },
      { key: 'thai', name: '타이마사지' },
      { key: 'aroma', name: '아로마마사지' },
      { key: 'waxing', name: '왁싱' },
      { key: 'chinese', name: '중국마사지' },
      { key: 'foot', name: '발마사지' },
      { key: 'spa', name: '스파' },
    ];

    // all 필터인 경우: 전체 8개를 모두 표시 (index.html 또는 지역 페이지)
    const currentPage = window.location.pathname.split('/').pop();
    let filtersToShow;

    if (excludeFilter === 'all' || !excludeFilter || excludeFilter === '') {
      // all 필터인 경우: 전체 8개 표시 (모든 페이지에서)
      filtersToShow = allFilters;
    } else {
      // 현재 필터를 제외한 나머지 필터들 (7개)
      filtersToShow = allFilters.filter(
        (filter) => filter.key !== excludeFilter && filter.key !== 'all'
      );
    }

    // 링크 HTML 생성
    let linksHTML =
      '<div style="display: flex; flex-direction: column; gap: 12px;">';

    filtersToShow.forEach((filter) => {
      let url = '#';
      try {
        if (typeof generateFilterLinkUrl === 'function') {
          url = generateFilterLinkUrl(
            filter.key,
            region,
            district,
            dongStationKey
          );
        } else {
          // generateFilterLinkUrl 함수가 없으면 기본 URL 생성
          if (filter.key === 'massage') {
            url = 'massage.html';
          } else if (filter.key === 'outcall') {
            url = 'outcall.html';
          } else {
            url = `${filter.key}.html`;
          }
        }
      } catch (e) {
        console.warn('generateFilterLinkUrl 오류:', e);
        // 기본 URL 사용
        if (filter.key === 'massage') {
          url = 'massage.html';
        } else if (filter.key === 'outcall') {
          url = 'outcall.html';
        } else {
          url = `${filter.key}.html`;
        }
      }

      // 기본 페이지 목록 (지역/세부지역 정보 없음)
      const basePages = [
        'index.html',
        'massage.html',
        'outcall.html',
        'swedish.html',
        'thai.html',
        'aroma.html',
        'waxing.html',
        'chinese.html',
        'foot.html',
      ];

      const currentPage = window.location.pathname.split('/').pop();
      const isBasePage = basePages.includes(currentPage);

      // 지역과 세부지역 정보를 앞에 붙이기 (기본 페이지가 아닐 때만)
      let displayName = filter.name;
      if (!isBasePage && region) {
        if (dongStation && district) {
          // 동/역이 있는 경우: "통영 명정동 마사지" (지역 제거)
          displayName = `${district} ${dongStation} ${filter.name}`;
        } else if (district) {
          // 세부지역까지 있는 경우: "제주 제주시 마사지"
          displayName = `${region} ${district} ${filter.name}`;
        } else {
          // 지역만 있는 경우: "제주 마사지"
          displayName = `${region} ${filter.name}`;
        }
      }

      linksHTML += `
        <a href="${url}" style="
          display: block;
          padding: 12px 16px;
          background-color: #f5f5f5;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: all 0.3s ease;
        " onmouseover="this.style.backgroundColor='#e0e0e0'; this.style.color='#007bff';"
           onmouseout="this.style.backgroundColor='#f5f5f5'; this.style.color='#333';">
          ${displayName}
        </a>
      `;
    });

    linksHTML += '</div>';
    return linksHTML;
  } catch (error) {
    console.error('generateFilterLinks 오류:', error);
    return '<p>필터 링크 생성 중 오류가 발생했습니다.</p>';
  }
}

// 필터 링크 URL 생성 함수
function generateFilterLinkUrl(filter, region, district, dongStationKey = '') {
  try {
    // 기본 페이지 목록 (지역/세부지역 정보 없음)
    const basePages = [
      'index.html',
      'massage.html',
      'outcall.html',
      'swedish.html',
      'thai.html',
      'aroma.html',
      'waxing.html',
      'chinese.html',
      'foot.html',
    ];

    const currentPage = window.location.pathname.split('/').pop();
    const isBasePage = basePages.includes(currentPage);

    // 기본 페이지인 경우: 지역/세부지역 정보 없이 기본 URL 반환
    if (isBasePage) {
      if (filter === 'massage') {
        return 'massage.html';
      } else if (filter === 'outcall') {
        return 'outcall.html';
      } else {
        return `${filter}.html`;
      }
    }

    // window.districtMap 사용 (중앙화된 지역 매핑)
    const districtMap = window.districtMap || {};

    // 동/역이 있는 경우
    if (region && district && dongStationKey) {
      // districtMap에서 지역 키 찾기
      let regionKey = '';
      let districtKey = '';

      for (const [key, value] of Object.entries(districtMap)) {
        if (value.regionName === region) {
          regionKey = key;
          // 구 찾기
          for (const [dKey, dData] of Object.entries(value.districts)) {
            const dName =
              typeof dData === 'string' ? dData : dData.districtsname;
            if (dName === district) {
              districtKey = dKey;
              break;
            }
          }
          break;
        }
      }

      if (regionKey && districtKey) {
        // 테마 필터인 경우
        if (
          filter === 'swedish' ||
          filter === 'thai' ||
          filter === 'aroma' ||
          filter === 'chinese' ||
          filter === 'foot' ||
          filter === 'waxing' ||
          filter === 'spa'
        ) {
          if (
            window.getThemePageUrl &&
            typeof window.getThemePageUrl === 'function'
          ) {
            const themePage = window.getThemePageUrl(
              filter,
              region,
              district,
              dongStationKey
            );
            if (themePage) return themePage;
          }
          return `${regionKey}-${districtKey}-${dongStationKey}-${filter}.html`;
        } else if (filter === 'massage') {
          return `${regionKey}-${districtKey}-${dongStationKey}-massage.html`;
        } else if (filter === 'outcall') {
          return `${regionKey}-${districtKey}-${dongStationKey}-outcall.html`;
        }
      }
    }

    // 지역과 세부지역이 모두 있는 경우 (동/역 없음)
    if (region && district && !dongStationKey) {
      // districtMap에서 지역 키 찾기
      let regionKey = '';
      let districtKey = '';

      for (const [key, value] of Object.entries(districtMap)) {
        if (value.regionName === region) {
          regionKey = key;
          // 구 찾기
          for (const [dKey, dData] of Object.entries(value.districts)) {
            const dName =
              typeof dData === 'string' ? dData : dData.districtsname;
            if (dName === district) {
              districtKey = dKey;
              break;
            }
          }
          break;
        }
      }

      if (regionKey && districtKey) {
        // 테마 필터인 경우
        if (
          filter === 'swedish' ||
          filter === 'thai' ||
          filter === 'aroma' ||
          filter === 'chinese' ||
          filter === 'foot' ||
          filter === 'waxing' ||
          filter === 'spa'
        ) {
          if (
            window.getThemePageUrl &&
            typeof window.getThemePageUrl === 'function'
          ) {
            const themePage = window.getThemePageUrl(filter, region, district);
            if (themePage) return themePage;
          }
          return `${regionKey}-${districtKey}-${filter}.html`;
        } else if (filter === 'massage') {
          return `${regionKey}-${districtKey}-massage.html`;
        } else if (filter === 'outcall') {
          return `${regionKey}-${districtKey}-outcall.html`;
        }
      }
    }

    // 지역만 있는 경우
    if (region) {
      // districtMap에서 지역 키 찾기
      let regionKey = '';
      for (const [key, value] of Object.entries(districtMap)) {
        if (value.regionName === region) {
          regionKey = key;
          break;
        }
      }

      if (regionKey) {
        // 테마 필터인 경우
        if (
          filter === 'swedish' ||
          filter === 'thai' ||
          filter === 'aroma' ||
          filter === 'chinese' ||
          filter === 'foot' ||
          filter === 'waxing'
        ) {
          if (typeof getThemePageUrl === 'function') {
            const themePage = getThemePageUrl(filter, region, '');
            if (themePage) return themePage;
          }
          return `${regionKey}-${filter}.html`;
        } else if (filter === 'massage') {
          return `${regionKey}-massage.html`;
        } else if (filter === 'outcall') {
          return `${regionKey}-outcall.html`;
        }
      }
    }

    // 지역 정보가 없는 경우 (index.html 등)
    if (filter === 'massage') {
      return 'massage.html';
    } else if (filter === 'outcall') {
      return 'outcall.html';
    } else if (
      filter === 'swedish' ||
      filter === 'thai' ||
      filter === 'aroma' ||
      filter === 'chinese' ||
      filter === 'foot' ||
      filter === 'waxing'
    ) {
      return `${filter}.html`;
    }

    return '#';
  } catch (error) {
    console.error('generateFilterLinkUrl 오류:', error);
    // 기본 URL 반환
    if (filter === 'massage') {
      return 'massage.html';
    } else if (filter === 'outcall') {
      return 'outcall.html';
    } else {
      return `${filter}.html`;
    }
  }
}

// 관련정보 모달 열기
function openRelatedInfoModal(event) {
  event.preventDefault();

  const modal = document.getElementById('relatedInfoModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

// 모달 닫기
function closeModal(modalId) {
  try {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      // 인라인 스타일 제거 (openDetailsModal에서 설정한 스타일)
      modal.style.display = '';
      modal.style.alignItems = '';
      modal.style.justifyContent = '';
      modal.style.padding = '';
      modal.style.position = '';
      modal.style.top = '';
      modal.style.left = '';
      modal.style.width = '';
      modal.style.height = '';
      modal.style.background = '';
      modal.style.zIndex = '';
      document.body.style.overflow = ''; // 스크롤 복원

      console.log('모달 닫기 완료:', modalId);
    } else {
      console.warn('모달을 찾을 수 없습니다:', modalId);
    }
  } catch (error) {
    console.error('closeModal 오류:', error);
  }
}

// 전역 스코프에서 접근 가능하도록 window 객체에 할당
if (typeof window !== 'undefined') {
  window.closeModal = closeModal;
}

// 모달 배경 클릭 시 닫기
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    const modal = event.target;
    const modalId = modal.id;
    if (modalId) {
      closeModal(modalId);
    } else {
      // ID가 없는 경우 직접 닫기
      modal.classList.remove('active');
      modal.style.display = '';
      modal.style.alignItems = '';
      modal.style.justifyContent = '';
      modal.style.padding = '';
      modal.style.position = '';
      modal.style.top = '';
      modal.style.left = '';
      modal.style.width = '';
      modal.style.height = '';
      modal.style.background = '';
      modal.style.zIndex = '';
      document.body.style.overflow = '';
    }
  }
});

// 필터 컨테이너 드래그 스크롤 기능
function initFilterDragScroll() {
  const filterContainer = document.querySelector('.filter-container');
  if (!filterContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let hasMoved = false; // 드래그 움직임 감지

  // 마우스 이벤트
  filterContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    filterContainer.classList.add('active');
    startX = e.pageX - filterContainer.offsetLeft;
    scrollLeft = filterContainer.scrollLeft;
    e.preventDefault();
  });

  filterContainer.addEventListener('mouseleave', () => {
    isDown = false;
    filterContainer.classList.remove('active');
  });

  filterContainer.addEventListener('mouseup', (e) => {
    if (isDown && hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
    isDown = false;
    filterContainer.classList.remove('active');
  });

  filterContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    hasMoved = true;
    const x = e.pageX - filterContainer.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    filterContainer.scrollLeft = scrollLeft - walk;
  });

  // 터치 이벤트 (모바일)
  let startTouchX;
  let startScrollLeft;
  let touchHasMoved = false;

  filterContainer.addEventListener(
    'touchstart',
    (e) => {
      isDown = true;
      touchHasMoved = false;
      filterContainer.classList.add('active');
      startTouchX = e.touches[0].pageX;
      startScrollLeft = filterContainer.scrollLeft;
    },
    { passive: false }
  );

  filterContainer.addEventListener('touchend', (e) => {
    if (isDown && touchHasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
    isDown = false;
    filterContainer.classList.remove('active');
  });

  filterContainer.addEventListener(
    'touchmove',
    (e) => {
      if (!isDown) return;
      e.preventDefault();
      touchHasMoved = true;
      const touchX = e.touches[0].pageX;
      const walk = (startTouchX - touchX) * 2; // 스크롤 속도 조절
      filterContainer.scrollLeft = startScrollLeft + walk;
    },
    { passive: false }
  );

  // 휠 이벤트 (마우스 휠로 좌우 스크롤)
  filterContainer.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      filterContainer.scrollLeft += e.deltaY;
    },
    { passive: false }
  );

  // 필터 버튼 클릭 이벤트 방지 (드래그 중일 때)
  const filterButtons = filterContainer.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (hasMoved || touchHasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}

// ✅ 간단한 중앙화된 초기화 함수
async function initializeApp() {
  console.log('initializeApp 시작');

  // 업체 데이터 초기화 (shop-card-data.js 로드)
  await initializeShopData();
  console.log('initializeShopData 완료');

  initializeRegionOptions();
  console.log('initializeRegionOptions 완료');

  // window.districtMap 사용 (중앙화된 지역 매핑)
  const districtMap = window.districtMap || {};

  // 지역별 테마 페이지 URL 생성 함수 (중앙화)
  // massage/outcall = 정적 HTML, 나머지 테마 = 지역 허브 + ?filter=
  function getThemePageUrl(theme, region, district, dongStationKey = '') {
    const dynamicThemes = [
      'swedish',
      'thai',
      'aroma',
      'chinese',
      'foot',
      'waxing',
      'spa',
    ];
    const staticThemes = ['massage', 'outcall'];

    let regionKey = '';
    let districtKey = '';

    for (const [key, value] of Object.entries(districtMap)) {
      if (value.regionName === region) {
        regionKey = key;
        if (district && district !== '' && district !== '전체') {
          for (const [dKey, dData] of Object.entries(value.districts || {})) {
            const dName =
              typeof dData === 'string' ? dData : dData.districtsname || dData;
            if (dName === district) {
              districtKey = dKey;
              break;
            }
          }
        }
        break;
      }
    }

    let base = '';
    if (regionKey && districtKey && dongStationKey) {
      base = `${regionKey}-${districtKey}-${dongStationKey}`;
    } else if (regionKey && districtKey) {
      base = `${regionKey}-${districtKey}`;
    } else if (regionKey) {
      base = regionKey;
    }

    if (staticThemes.includes(theme)) {
      if (!base) return `${theme}.html`;
      return `${base}-${theme}.html`;
    }

    if (dynamicThemes.includes(theme)) {
      const page = base ? `${base}.html` : 'index.html';
      return `${page}?filter=${theme}`;
    }

    return base ? `${base}.html` : 'index.html';
  }

  // getThemePageUrl을 전역에서 접근 가능하도록 설정 (다른 함수에서도 사용)
  window.getThemePageUrl = getThemePageUrl;

  // 지역/구 선택 이벤트 리스너 (districtMap 활용)
  const regionSelect = document.getElementById('regionSelect');
  const districtSelect = document.getElementById('districtSelect');

  if (regionSelect) {
    regionSelect.addEventListener('change', function () {
      const selectedRegion = regionSelect.value;

      // 현재 페이지 파일명 가져오기
      const currentPath = window.location.pathname;
      const currentFileName = currentPath.split('/').pop();

      // districtMap에서 해당 지역 찾기
      for (const [regionKey, regionData] of Object.entries(districtMap)) {
        if (regionData.regionName === selectedRegion) {
          // 구 옵션 업데이트
          updateDistrictOptions(selectedRegion);
          // 구 선택 활성화
          if (districtSelect) {
            districtSelect.disabled = false;
            districtSelect.style.opacity = '1';
          }

          // 이동할 페이지 결정
          let targetPage = '';
          if (currentFilter === 'massage') {
            targetPage = `${regionKey}-massage.html`;
          } else if (currentFilter === 'outcall') {
            targetPage = `${regionKey}-outcall.html`;
          } else if (
            currentFilter === 'swedish' ||
            currentFilter === 'thai' ||
            currentFilter === 'aroma' ||
            currentFilter === 'chinese' ||
            currentFilter === 'foot' ||
            currentFilter === 'waxing' ||
            currentFilter === 'spa'
          ) {
            // 중앙화된 함수로 테마 페이지 URL 생성
            targetPage = window.getThemePageUrl
              ? window.getThemePageUrl(currentFilter, selectedRegion, '')
              : null;
            if (!targetPage) {
              // 함수가 null을 반환하면 기본 패턴 사용
              targetPage = `${regionKey}-${currentFilter}.html`;
            }
          } else {
            targetPage = `${regionKey}.html`;
          }

          // 현재 페이지와 같으면 이동하지 않음
          if (currentFileName !== targetPage) {
            window.location.href = targetPage;
          } else {
            // 같은 페이지면 필터만 업데이트
            if (typeof displayFilteredResults === 'function') {
              displayFilteredResults();
            }
          }
          return;
        }
      }
    });
  }

  if (districtSelect) {
    districtSelect.addEventListener('change', function () {
      const selectedRegion = regionSelect.value;
      const selectedDistrict = districtSelect.value;

      if (!selectedRegion || !selectedDistrict) {
        return;
      }

      // 동/역 옵션 업데이트
      updateDongStationOptions(selectedRegion, selectedDistrict);

      // currentRegion과 currentDistrict 업데이트
      currentRegion = selectedRegion;
      currentDistrict = selectedDistrict;

      // 현재 페이지 파일명 가져오기
      const currentPath = window.location.pathname;
      const currentFileName = currentPath.split('/').pop();

      // districtMap에서 해당 지역과 구 찾기
      for (const [regionKey, regionData] of Object.entries(districtMap)) {
        if (regionData.regionName === selectedRegion) {
          // 구 키 찾기
          for (const [districtKey, districtData] of Object.entries(
            regionData.districts
          )) {
            // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
            const districtName =
              typeof districtData === 'string'
                ? districtData
                : districtData.districtsname;

            if (districtName === selectedDistrict) {
              // 이동할 페이지 결정
              let targetPage = '';

              if (currentFilter === 'massage') {
                targetPage = `${regionKey}-${districtKey}-massage.html`;
              } else if (currentFilter === 'outcall') {
                targetPage = `${regionKey}-${districtKey}-outcall.html`;
              } else if (
                currentFilter === 'swedish' ||
                currentFilter === 'thai' ||
                currentFilter === 'aroma' ||
                currentFilter === 'chinese' ||
                currentFilter === 'foot' ||
                currentFilter === 'waxing' ||
                currentFilter === 'spa'
              ) {
                // 중앙화된 함수로 테마 페이지 URL 생성 (구는 고려하지 않음)
                targetPage = window.getThemePageUrl
                  ? window.getThemePageUrl(
                      currentFilter,
                      selectedRegion,
                      selectedDistrict
                    )
                  : null;
                if (!targetPage) {
                  // 함수가 null을 반환하면 기본 패턴 사용
                  targetPage = `${regionKey}-${districtKey}-${currentFilter}.html`;
                }
              } else {
                targetPage = `${regionKey}-${districtKey}.html`;
              }

              // 현재 페이지와 같으면 이동하지 않음
              if (currentFileName !== targetPage) {
                window.location.href = targetPage;
              } else {
                // 같은 페이지면 필터만 업데이트
                if (typeof displayFilteredResults === 'function') {
                  displayFilteredResults();
                }
              }
              return;
            }
          }
          break;
        }
      }
    });
  }

  // 동/역 선택 이벤트 리스너
  const dongStationSelect = document.getElementById('dongStationSelect');
  if (dongStationSelect) {
    dongStationSelect.addEventListener('change', function () {
      const selectedRegion = regionSelect ? regionSelect.value : '';
      const selectedDistrict = districtSelect ? districtSelect.value : '';
      const selectedDongStation = dongStationSelect.value;

      if (!selectedRegion || !selectedDistrict || !selectedDongStation) {
        return;
      }

      // 현재 활성화된 필터 버튼에서 타입(필터) 정보 가져오기
      const activeFilterBtn = document.querySelector(
        '.filter-btn.active[data-filter]'
      );
      const currentType = activeFilterBtn
        ? activeFilterBtn.getAttribute('data-filter')
        : 'all';

      // 파일명에서도 타입 정보 추출 (백업용)
      const currentFileName = window.location.pathname.split('/').pop();
      const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);
      const detectedType = detectedInfo.filter || '';

      // 활성 필터 버튼이 없으면 파일명에서 추출한 타입 사용, 그것도 없으면 'all'
      const finalType =
        currentType !== 'all' ? currentType : detectedType || 'all';

      // districtMap에서 지역, 구, 동 키 찾기
      for (const [regionKey, regionData] of Object.entries(districtMap)) {
        if (regionData.regionName === selectedRegion) {
          for (const [districtKey, districtData] of Object.entries(
            regionData.districts
          )) {
            // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
            const districtName =
              typeof districtData === 'string'
                ? districtData
                : districtData.districtsname;

            if (districtName === selectedDistrict) {
              // 새 구조이고 dongStations가 있는 경우
              if (
                typeof districtData === 'object' &&
                districtData.dongStations
              ) {
                if (districtData.dongStations[selectedDongStation]) {
                  // 타입이 'all'이거나 없으면 타입을 URL에 포함하지 않음
                  // 타입이 있으면 타입을 URL에 포함
                  let targetPage;
                  if (finalType === 'all' || !finalType) {
                    // 예: seoul-gangnam-yeoksam-dong.html
                    targetPage = `${regionKey}-${districtKey}-${selectedDongStation}.html`;
                  } else {
                    // 예: seoul-gangnam-yeoksam-dong-massage.html
                    targetPage = `${regionKey}-${districtKey}-${selectedDongStation}-${finalType}.html`;
                  }

                  const currentFileNameWithoutExt = currentFileName.replace(
                    '.html',
                    ''
                  );

                  // 현재 페이지와 같으면 이동하지 않음
                  if (
                    currentFileNameWithoutExt !==
                    targetPage.replace('.html', '')
                  ) {
                  window.location.href = targetPage;
                  } else {
                    // 같은 페이지면 필터만 업데이트
                    if (typeof displayFilteredResults === 'function') {
                      displayFilteredResults();
                    }
                  }
                  return;
                }
              }
            }
          }
          break;
        }
      }
    });
  }

  // 필터 버튼 이벤트 리스너 추가 (페이지 이동 및 인페이지 필터링)
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-filter');
      if (filter) {
        // 현재 선택된 지역과 세부지역 가져오기 (선택 박스 우선)
        const regionSelect = document.getElementById('regionSelect');
        const districtSelect = document.getElementById('districtSelect');

        let region = currentRegion;
        let district = currentDistrict;

        // 선택 박스에서 값 가져오기 (우선순위)
        if (regionSelect && regionSelect.value) {
          region = regionSelect.value;
        }
        if (districtSelect && districtSelect.value) {
          district = districtSelect.value;
        }

        // 지역이 선택되지 않은 경우: all/massage/outcall 은 전용 페이지로 이동
        if (!region || region === '' || region === '지역을 선택하세요') {
          const pageByFilter = {
            all: 'index.html',
            massage: 'massage.html',
            outcall: 'outcall.html',
          };
          const targetPage = pageByFilter[filter];
          if (targetPage) {
            let currentPage =
              (window.location.pathname.split('/').pop() || '').toLowerCase();
            if (!currentPage || currentPage === '/') currentPage = 'index.html';
            if (!currentPage.endsWith('.html')) currentPage += '.html';
            if (currentPage !== targetPage) {
              window.location.href = targetPage;
              return;
            }
          }

          currentFilter = filter;
          window.currentFilter = filter;

          document
            .querySelectorAll('.filter-btn[data-filter]')
            .forEach((b) => b.classList.remove('active'));
          const targetBtn = document.querySelector(
            `.filter-btn[data-filter="${filter}"]`
          );
          if (targetBtn) targetBtn.classList.add('active');

          if (typeof displayFilteredResults === 'function') {
            displayFilteredResults();
          }
          return;
        }

        // ------------------------------
        // 여기부터는 지역이 선택된 경우: 페이지 이동
        // ------------------------------

        // 현재 페이지 분석 (폴더 기반 URL 대응)
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(Boolean);
        let currentFileName = '';

        if (pathSegments.length === 0) {
          currentFileName = 'index';
        } else {
          const lastSegment = pathSegments[pathSegments.length - 1];
          if (lastSegment.endsWith('.html')) {
            if (lastSegment === 'index.html' && pathSegments.length > 1) {
              currentFileName = pathSegments
                .slice(0, pathSegments.length - 1)
                .join('-');
            } else {
              currentFileName = lastSegment.replace('.html', '');
            }
          } else {
            currentFileName = pathSegments.join('-');
          }
        }
        const parts = currentFileName.split('-');

        // districtMap에서 현재 지역과 구 찾기
        let regionKey = '';
        let districtKey = '';

        for (const [key, value] of Object.entries(districtMap)) {
          if (value.regionName === region) {
            regionKey = key;
            // 구 찾기
            for (const [dKey, dData] of Object.entries(value.districts)) {
              // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
              const dName =
                typeof dData === 'string'
                  ? dData
                  : dData.districtsname || dData;

              if (dName === district) {
                districtKey = dKey;
                break;
              }
            }

            // 구를 선택하지 않았지만, 해당 지역에 구가 1개뿐이면 기본 구로 사용
            if (!districtKey) {
              const districtKeys = Object.keys(value.districts || {});
              if (districtKeys.length === 1) {
                districtKey = districtKeys[0];
              }
            }
            break;
          }
        }

        // 동/역 키 추출 (현재 선택된 동/역 또는 파일명에서)
        let dongStationKey = '';
        const dongStationSelect = document.getElementById('dongStationSelect');
        if (dongStationSelect && dongStationSelect.value) {
          dongStationKey = dongStationSelect.value;
        } else {
          // 파일명에서 동/역 키 추출
          const filterKeywords = [
            'massage',
            'outcall',
            'swedish',
            'thai',
            'aroma',
            'waxing',
            'chinese',
            'foot',
            'spa',
          ];
          let dongParts = [];
          for (let i = 2; i < parts.length; i++) {
            if (filterKeywords.includes(parts[i])) {
              break;
            }
            dongParts.push(parts[i]);
          }
          if (dongParts.length > 0) {
            dongStationKey = dongParts.join('-');
          }
        }

        // 필터에 따른 페이지 이동
        if (regionKey) {
          if (filter === 'all') {
            if (dongStationKey && districtKey) {
              window.location.href = `${regionKey}-${districtKey}-${dongStationKey}.html`;
            } else if (districtKey) {
              window.location.href = `${regionKey}-${districtKey}.html`;
            } else {
              window.location.href = `${regionKey}.html`;
            }
          } else if (filter === 'massage' || filter === 'outcall') {
            if (dongStationKey && districtKey) {
              window.location.href = `${regionKey}-${districtKey}-${dongStationKey}-${filter}.html`;
            } else if (districtKey) {
              window.location.href = `${regionKey}-${districtKey}-${filter}.html`;
            } else {
              window.location.href = `${regionKey}-${filter}.html`;
            }
          } else if (
            filter === 'swedish' ||
            filter === 'thai' ||
            filter === 'aroma' ||
            filter === 'chinese' ||
            filter === 'foot' ||
            filter === 'waxing' ||
            filter === 'spa'
          ) {
            const targetThemePage = window.getThemePageUrl
              ? window.getThemePageUrl(
                  filter,
                  region,
                  district,
                  dongStationKey
                )
              : null;
            if (targetThemePage) {
              window.location.href = targetThemePage;
              return;
            }
            const hub = dongStationKey && districtKey
              ? `${regionKey}-${districtKey}-${dongStationKey}.html`
              : districtKey
                ? `${regionKey}-${districtKey}.html`
                : `${regionKey}.html`;
            window.location.href = `${hub}?filter=${filter}`;
          }
        } else {
          // districtMap에 없는 지역의 경우 (테마 페이지들: swedish, thai, aroma 등)
          if (filter === 'all') {
            // 전체 필터 클릭 시 index.html로 이동
            window.location.href = 'index.html';
            return;
          } else if (filter === 'massage') {
            window.location.href = 'massage.html';
          } else if (filter === 'outcall') {
            window.location.href = 'outcall.html';
          } else if (
            filter === 'swedish' ||
            filter === 'thai' ||
            filter === 'aroma' ||
            filter === 'chinese' ||
            filter === 'foot' ||
            filter === 'waxing' ||
            filter === 'spa'
          ) {
            const regionSelect = document.getElementById('regionSelect');
            const districtSelect = document.getElementById('districtSelect');

            let region = currentRegion;
            let district = currentDistrict;

            if (regionSelect && regionSelect.value) {
              region = regionSelect.value;
            }
            if (districtSelect && districtSelect.value) {
              district = districtSelect.value;
            }

            const targetThemePage = window.getThemePageUrl
              ? window.getThemePageUrl(filter, region, district)
              : null;
            if (targetThemePage) {
              window.location.href = targetThemePage;
              return;
            }
            window.location.href = `index.html?filter=${filter}`;
          }
        }
      }
    });
  });

  // footer-links 텍스트 업데이트
  if (typeof updateFooterLinkText === 'function') {
    updateFooterLinkText();
  }

  // 파일명/경로 분석 (폴더 기반 URL 대응)
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean); // 빈 문자열 제거

  let currentFileName = '';

  if (pathSegments.length === 0) {
    // 루트(/)인 경우 index로 간주
    currentFileName = 'index';
  } else {
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (lastSegment.endsWith('.html')) {
      // 파일 기반 URL
      if (lastSegment === 'index.html') {
        // /twon/index.html, /index.html 모두 메인으로 처리
        currentFileName = 'index';
      } else {
        // 일반적인 xxx.html
        currentFileName = lastSegment.replace('.html', '');
      }
    } else {
      // 폴더 기반 URL
      // GitHub Pages 프로젝트 루트(/twon/)는 districtMap에 없는 단일 세그먼트 → index
      if (
        pathSegments.length === 1 &&
        !(window.districtMap && window.districtMap[pathSegments[0]])
      ) {
        currentFileName = 'index';
      } else {
        currentFileName = pathSegments.join('-');
      }
    }
  }

  const parts = currentFileName.split('-');

  // URL 쿼리스트링에서 filter 파라미터 감지 (예: ?filter=outcall)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    const allowedFilters = [
      'all',
      'massage',
      'outcall',
      'swedish',
      'thai',
      'aroma',
      'chinese',
      'foot',
      'waxing',
      'spa',
    ];
    if (urlFilter && allowedFilters.includes(urlFilter)) {
      currentFilter = urlFilter;
      window.currentFilter = urlFilter;
    }
  } catch (e) {
    console.warn('URL filter parsing error:', e);
  }

  // index.html, massage.html, outcall.html 처리
  if (
    currentFileName === 'index' ||
    currentFileName === '' ||
    currentFileName === 'massage' ||
    currentFileName === 'outcall' ||
    currentFileName === 'swedish' ||
    currentFileName === 'thai' ||
    currentFileName === 'aroma' ||
    currentFileName === 'chinese' ||
    currentFileName === 'foot' ||
    currentFileName === 'waxing'
  ) {
    // 필터 설정
    if (currentFileName === 'massage') {
      currentFilter = 'massage';
    } else if (currentFileName === 'outcall') {
      currentFilter = 'outcall';
    } else if (currentFileName === 'swedish') {
      currentFilter = 'swedish';
    } else if (currentFileName === 'thai') {
      currentFilter = 'thai';
    } else if (currentFileName === 'aroma') {
      currentFilter = 'aroma';
    } else if (currentFileName === 'chinese') {
      currentFilter = 'chinese';
    } else if (currentFileName === 'foot') {
      currentFilter = 'foot';
    } else if (currentFileName === 'waxing') {
      currentFilter = 'waxing';
    } else {
      currentFilter = 'all';
    }

    console.log('Current filter set to:', currentFilter);

    // 필터 버튼 활성화 상태 설정
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    filterButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.dataset.filter === currentFilter) {
        btn.classList.add('active');
      }
    });
  }
  // districtMap은 함수 상단에서 이미 정의되었습니다.

  // ------------------------------------
  // 메인 처리 로직
  // ------------------------------------
  if (districtMap[parts[0]]) {
    const regionData = districtMap[parts[0]];
    currentRegion = regionData.regionName;

    console.log(`${currentRegion} parts:`, parts);
    console.log('Parts[1]:', parts[1]);
    console.log('Parts length:', parts.length);

    // 구 설정 (파일명에서)
    const districtData = regionData.districts[parts[1]];
    // 새 구조 (객체) 또는 기존 구조 (문자열) 처리
    currentDistrict =
      typeof districtData === 'string'
        ? districtData
        : districtData?.districtsname || districtData || '';
    window.currentDistrict = currentDistrict;
    window.currentRegion = currentRegion;

    // URL 파라미터에서 district 읽기 (표시용)
    // 출장마사지 페이지인 경우에는 district를 필터링에 사용하지 않음
    const urlParams = new URLSearchParams(window.location.search);
    const urlDistrict = urlParams.get('district');

    // 출장마사지 페이지 여부 확인
    const isOutcallPage =
      parts.includes('outcall') || window.location.pathname.includes('outcall');

    if (urlDistrict && !currentDistrict) {
      // 출장마사지 페이지가 아니면 district 설정
      if (!isOutcallPage) {
        currentDistrict = urlDistrict;
      }
      // 출장마사지 페이지는 district를 표시용으로만 사용 (필터링에는 사용 안 함)
    }

    console.log('Current district set to:', currentDistrict || '(empty)');

    // 필터 감지 (공통 로직) - 동/역이 포함된 파일명도 처리
    // 예: seoul-gangnam-yeoksam-dong-massage.html
    // parts[0]=seoul, parts[1]=gangnam, parts[2]=yeoksam, parts[3]=dong, parts[4]=massage
    let detectedFilter = 'all';
    const filterKeywords = [
      'massage',
      'outcall',
      'swedish',
      'thai',
      'aroma',
      'waxing',
      'chinese',
      'foot',
      'spa',
    ];

    // parts 배열에서 필터 키워드 찾기 (동/역 이후에 올 수 있음)
    for (let i = 0; i < parts.length; i++) {
      if (filterKeywords.includes(parts[i])) {
        detectedFilter = parts[i];
        break;
      }
    }

    currentFilter = detectedFilter;

    // 출장마사지 페이지인 경우 currentDistrict는 표시용으로만 사용 (필터링에는 사용 안 함)
    // 이미 위에서 구 필터 적용 시 currentFilter !== 'outcall' 조건으로 처리됨

    // UI 업데이트
    if (regionSelect) {
      regionSelect.value = currentRegion;
      console.log('Region select updated to:', regionSelect.value);
    }

    // 구 선택 옵션 업데이트
    if (districtSelect) {
      districtSelect.disabled = false;
      districtSelect.style.opacity = '1';
      console.log('District select activated immediately');
    }

    if (typeof updateDistrictOptions === 'function') {
      updateDistrictOptions(currentRegion);
    }

    // 구 선택 값 설정 (약간의 지연)
    setTimeout(() => {
      if (districtSelect) {
        const options = districtSelect.querySelectorAll('option');
        console.log(
          'Available district options:',
          Array.from(options).map((opt) => opt.value)
        );

        // currentDistrict가 객체인 경우 문자열로 변환
        const districtStr =
          typeof currentDistrict === 'string'
            ? currentDistrict
            : currentDistrict?.districtsname || currentDistrict || '';

        const optionExists = Array.from(districtSelect.options).some(
          (option) => option.value === districtStr
        );
        if (optionExists) {
          districtSelect.value = districtStr;
          districtSelect.disabled = false;
          districtSelect.style.opacity = '1';
          console.log('District select updated to:', districtSelect.value);

          // 동/역 옵션 업데이트
          if (regionSelect && regionSelect.value) {
            updateDongStationOptions(regionSelect.value, districtStr);

            // 파일명에서 동/역 키 추출 및 선택값 설정
            // 예: seoul-gangnam-yeoksam-dong.html -> yeoksam-dong
            // 예: seoul-gangnam-yeoksam-dong-massage.html -> yeoksam-dong
            // 예: seoul-gangnam-yeoksam-station.html -> yeoksam-station
            let detectedDongKey = null;
            const filterKeywords = [
              'massage',
              'outcall',
              'swedish',
              'thai',
              'aroma',
              'waxing',
              'chinese',
              'foot',
              'spa',
            ];

            // parts[2]부터 동/역 키 찾기 (parts[0]=지역, parts[1]=세부지역)
            if (parts.length >= 3) {
              // parts[2]가 필터 키워드가 아니면 동/역 키로 간주
              if (!filterKeywords.includes(parts[2])) {
                // parts[2]와 parts[3]을 조합 (예: yeoksam-dong, yeoksam-station)
                if (parts.length >= 4 && !filterKeywords.includes(parts[3])) {
                  // parts[3]이 필터 키워드가 아니면 parts[2]-parts[3] 조합
                  detectedDongKey = `${parts[2]}-${parts[3]}`;
                } else {
                  // parts[3]이 없거나 필터 키워드면 parts[2]만 사용
                  detectedDongKey = parts[2];
                }
              }
            }

            // 동/역 선택값 설정 (약간의 지연 후)
            if (detectedDongKey) {
              setTimeout(() => {
                const dongStationSelect =
                  document.getElementById('dongStationSelect');
                if (dongStationSelect) {
                  // 옵션이 로드될 때까지 대기
                  const checkOption = setInterval(() => {
                    const optionExists = Array.from(
                      dongStationSelect.options
                    ).some((option) => option.value === detectedDongKey);
                    if (optionExists) {
                      dongStationSelect.value = detectedDongKey;
                      dongStationSelect.disabled = false;
                      dongStationSelect.style.opacity = '1';
                      console.log(
                        'Dong/Station select updated to:',
                        detectedDongKey
                      );
                      clearInterval(checkOption);
                    }
                  }, 50);

                  // 최대 2초 대기
                  setTimeout(() => clearInterval(checkOption), 2000);
                }
              }, 400);
            }
          }
        }
      }
    }, 300);
  }

  // 필터 버튼 자동 링크 생성 및 활성화
  setupFilterButtons();

  // 파일명에서 타입 추출하여 필터 버튼 활성화
  const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);
  if (detectedInfo.filter) {
    currentFilter = detectedInfo.filter;
    window.currentFilter = detectedInfo.filter;

    // 해당 필터 버튼 활성화
    setTimeout(() => {
      const filterButtons = document.querySelectorAll(
        '.filter-btn[data-filter]'
      );
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        if (btn.dataset.filter === detectedInfo.filter) {
          btn.classList.add('active');
          console.log('Filter button activated:', detectedInfo.filter);
        }
      });
    }, 100);
  } else if (!detectedInfo.filter && parts.length >= 3) {
    // 동/역이 있는데 타입이 없으면 'all' 필터 활성화
    currentFilter = 'all';
    window.currentFilter = 'all';

    setTimeout(() => {
      const allFilterBtn = document.querySelector(
        '.filter-btn[data-filter="all"]'
      );
      if (allFilterBtn) {
        document.querySelectorAll('.filter-btn').forEach((btn) => {
          btn.classList.remove('active');
        });
        allFilterBtn.classList.add('active');
        console.log('All filter button activated');
      }
    }, 100);
  }

  // 결과 제목 업데이트
  updateResultsTitle();

  // 테마 페이지별 currentFilter 자동 설정
  const themePath = window.location.pathname;
  const themeFileName = themePath.split('/').pop();
  const themeFileMap = {
    'swedish.html': 'swedish',
    'thai.html': 'thai',
    'aroma.html': 'aroma',
    'chinese.html': 'chinese',
    'foot.html': 'foot',
    'waxing.html': 'waxing',
    'spa.html': 'spa',
  };

  if (themeFileMap[themeFileName]) {
    currentFilter = themeFileMap[themeFileName];
  }

  // window.currentFilter가 설정되어 있으면 우선 사용
  if (window.currentFilter && typeof window.currentFilter !== 'undefined') {
    currentFilter = window.currentFilter;
  }

  // 필터링된 결과 표시
  if (typeof displayFilteredResults === 'function') {
    displayFilteredResults();
  }

  // 타입 필터 버튼 초기화
  initializeTypeFilter();

  // nearby-shops-title 자동 설정 (다른 샵 보기 클릭 이벤트)
  if (typeof window.initializeNearbyShopsTitle === 'function') {
    window.initializeNearbyShopsTitle();
  }
}

// 타입 필터 버튼 초기화 함수
function initializeTypeFilter() {
  const typeFilterBtn = document.getElementById('typeFilterBtn');
  const typeDropdownMenu = document.getElementById('typeDropdownMenu');
  const themeFilterSection = document.getElementById('themeFilterSection');

  if (typeFilterBtn && themeFilterSection) {
    // 기존 이벤트 리스너 제거
    typeFilterBtn.removeEventListener('click', handleTypeFilterClick);

    // 새로운 이벤트 리스너 추가
    typeFilterBtn.addEventListener('click', handleTypeFilterClick);
  }
}

// 타입 필터 버튼 클릭 핸들러
function handleTypeFilterClick(e) {
  e.preventDefault();
  e.stopPropagation();

  const themeFilterSection = document.getElementById('themeFilterSection');
  const typeFilterBtn = document.getElementById('typeFilterBtn');

  if (themeFilterSection && typeFilterBtn) {
    const isVisible = themeFilterSection.style.display !== 'none';
    themeFilterSection.style.display = isVisible ? 'none' : 'block';

    // 버튼 활성화 상태 토글
    typeFilterBtn.classList.toggle('active', !isVisible);

    // 테마 필터 섹션이 보여질 때 필터 섹션 바로 아래에 고정되도록 위치 조정
    if (!isVisible) {
      // 필터 섹션의 실제 높이를 계산하여 위치 조정
      const filterSection = document.querySelector('.filter-section');
      if (filterSection) {
        // 약간의 지연을 두고 계산하여 DOM 업데이트 완료 후 위치 계산
        setTimeout(() => {
          // 필터 섹션의 실제 높이 (offsetHeight 사용)
          const filterSectionHeight = filterSection.offsetHeight;
          // 필터 섹션의 getBoundingClientRect로 현재 viewport에서의 위치 확인
          const filterSectionRect = filterSection.getBoundingClientRect();

          // 필터 섹션이 sticky로 고정되어 있는지 확인 (top이 1px 근처인지)
          const isFilterSticky = filterSectionRect.top <= 10;

          if (isFilterSticky) {
            // 필터 섹션이 sticky로 고정되어 있으면: 헤더 높이 + 필터 섹션 높이
            const header = document.getElementById('mainHeader');
            const headerHeight = header ? header.offsetHeight : 80;
            themeFilterSection.style.top = `${
              headerHeight + filterSectionHeight
            }px`;
          } else {
            // 필터 섹션이 sticky가 아니면: 필터 섹션의 viewport 기준 bottom 위치
            const filterSectionBottom =
              filterSectionRect.top + filterSectionHeight;
            themeFilterSection.style.top = `${filterSectionBottom}px`;
          }
        }, 10);
      } else {
        // 필터 섹션을 찾을 수 없는 경우 기본값 사용
        const header = document.getElementById('mainHeader');
        const headerHeight = header ? header.offsetHeight : 80;
        const defaultFilterHeight = 60;
        themeFilterSection.style.top = `${
          headerHeight + defaultFilterHeight
        }px`;
      }
    }

    console.log('Type filter toggled:', !isVisible);
  }
}

// 필터 버튼 자동 설정 함수
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const currentPage = window.location.pathname
    .split('/')
    .pop()
    .replace('.html', '');

  filterButtons.forEach((btn) => {
    const filter = btn.dataset.filter;
    const href = generateFilterLink(filter);

    // 링크 설정
    btn.href = href;
    btn.classList.remove('active');

    // 현재 페이지와 일치하면 활성화
    const targetPage = href.replace('.html', '');
    if (currentPage === targetPage) {
      btn.classList.add('active');
    }
  });
}

// 필터 링크 자동 생성 함수
function generateFilterLink(filter) {
  const currentPage = window.location.pathname
    .split('/')
    .pop()
    .replace('.html', '');
  const parts = currentPage.split('-');

  // 디버깅용 콘솔
  console.log('Current page:', currentPage);
  console.log('Parts:', parts);
  console.log('Filter:', filter);

  // index.html, massage.html, outcall.html에서의 특별 처리
  if (
    currentPage === 'index' ||
    currentPage === '' ||
    currentPage === 'massage' ||
    currentPage === 'outcall' ||
    currentPage === 'swedish' ||
    currentPage === 'thai' ||
    currentPage === 'aroma' ||
    currentPage === 'chinese' ||
    currentPage === 'foot' ||
    currentPage === 'waxing' ||
    currentPage === 'spa'
  ) {
    if (filter === 'all') {
      return 'index.html';
    } else if (filter === 'massage') {
      return 'massage.html';
    } else if (filter === 'outcall') {
      return 'outcall.html';
    } else if (filter === 'swedish') {
      return 'swedish.html';
    } else if (filter === 'thai') {
      return 'thai.html';
    } else if (filter === 'aroma') {
      return 'aroma.html';
    } else if (filter === 'chinese') {
      return 'chinese.html';
    } else if (filter === 'foot') {
      return 'foot.html';
    } else if (filter === 'waxing') {
      return 'waxing.html';
    } else if (filter === 'spa') {
      return 'spa.html';
    }
  }

  // 필터 키워드 목록
  const filterKeywords = [
    'massage',
    'outcall',
    'swedish',
    'thai',
    'aroma',
    'waxing',
    'chinese',
    'foot',
    'spa',
  ];

  // 기본 구조: [region]-[district]-[dongStation]-[filter]
  let region = parts[0] || '';
  let district = parts[1] || '';
  let dongStation = '';

  // 동/역 키 추출 (parts[2]부터 필터 키워드 이전까지)
  // 예: seoul-gangnam-yeoksam-dong.html -> yeoksam-dong
  // 예: seoul-gangnam-yeoksam-dong-massage.html -> yeoksam-dong
  if (parts.length >= 3) {
    let dongParts = [];
    for (let i = 2; i < parts.length; i++) {
      if (filterKeywords.includes(parts[i])) {
        // 필터 키워드를 만나면 중단
        break;
      }
      dongParts.push(parts[i]);
    }
    if (dongParts.length > 0) {
      dongStation = dongParts.join('-');
    }
  }

  // district가 filter와 같은 경우 (예: jeju-massage에서 massage는 district가 아님)
  if (filterKeywords.includes(district)) {
    district = '';
  }

  console.log(
    'Region:',
    region,
    'District:',
    district,
    'DongStation:',
    dongStation
  );

  // URL 생성
  if (filter === 'all') {
    // 전체: region-district-dongStation 또는 region-district 또는 region
    if (dongStation && district) {
      return `${region}-${district}-${dongStation}.html`;
    } else if (district) {
      return `${region}-${district}.html`;
  } else {
      return `${region}.html`;
    }
  } else {
    // 필터가 있는 경우: region-district-dongStation-filter 또는 region-district-filter 또는 region-filter
    if (dongStation && district) {
      return `${region}-${district}-${dongStation}-${filter}.html`;
    } else if (district) {
      return `${region}-${district}-${filter}.html`;
    } else {
      return `${region}-${filter}.html`;
    }
  }
}

// 중앙화된 함수: 지역+테마 필터 페이지로 이동
// detail.js와 다른 곳에서 사용 가능
window.goToRegionPageWithTheme = function (region, district, theme) {
  // window.districtMap 사용 (중앙화된 지역 매핑)
  const districtMap = window.districtMap || {};

  // 한글 지역명으로 영어 키 찾기
  let regionEng = '';
  for (const [key, value] of Object.entries(districtMap)) {
    if (value.regionName === region) {
      regionEng = value.regionEng || key;
      break;
    }
  }

  if (!regionEng) {
    console.warn('알 수 없는 지역:', region);
    window.location.href = 'index.html';
    return;
  }

  // 구별 영어 키 찾기
  let districtEng = '';
  if (district) {
    for (const [key, value] of Object.entries(districtMap)) {
      if (value.regionName === region) {
        for (const [dKey, dName] of Object.entries(value.districts || {})) {
          if (dName === district) {
            districtEng = dKey;
            break;
          }
        }
        break;
      }
    }
  }

  let url = '';

  // 출장마사지는 구를 무시하고 지역만으로 이동
  const isOutcall = theme === 'outcall';

  // 테마가 지정된 경우
  if (theme && theme !== 'all') {
    if (isOutcall) {
      // 출장마사지: 구 무시하고 지역-테마 형식만 사용 (jeju-outcall.html)
      url = `${regionEng}-${theme}.html`;
      // district 정보는 URL 파라미터로 추가 (표시용)
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }
    } else if (districtEng) {
      // 일반 마사지: 지역-구-테마 형식 (jeju-si-massage.html)
      url = `${regionEng}-${districtEng}-${theme}.html`;
      // 상세지역이 있으면 항상 URL 파라미터로 추가
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }
    } else {
      // 지역-테마 형식 (jeju-massage.html)
      // 상세지역이 있으면 URL 파라미터로 추가
      url = `${regionEng}-${theme}.html`;
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }
    }
  } else {
    // 테마가 없으면 기본 마사지 페이지
    if (districtEng) {
      url = `${regionEng}-${districtEng}-massage.html`;
      // 상세지역이 있으면 항상 URL 파라미터로 추가
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }
    } else {
      url = `${regionEng}-massage.html`;
      // 상세지역이 있으면 URL 파라미터로 추가
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }
    }
  }

  console.log('페이지 이동:', url);
  window.location.href = url;
};

// 결과 제목 업데이트 함수
function updateResultsTitle() {
  const resultsTitle = document.getElementById('resultsTitle');
  if (!resultsTitle) return;

  let title = '';

  // 테마 필터가 먼저 처리
  const themeNames = {
    swedish: '스웨디시',
    thai: '타이마사지',
    aroma: '아로마마사지',
    waxing: '왁싱',
    chinese: '중국마사지',
    foot: '발마사지',
    spa: '스파',
  };

  // 동/역 정보 가져오기
  let dongStation = '';
  const dongStationSelect = document.getElementById('dongStationSelect');
  if (dongStationSelect && dongStationSelect.value) {
    const dongStationKey = dongStationSelect.value;
    const districtMap = window.districtMap || {};

    // 파일명에서 동/역 정보 추출 시도
    const currentFileName = window.location.pathname.split('/').pop();
    const detectedInfo = detectRegionAndDistrictFromFilename(currentFileName);

    if (detectedInfo.dongStation) {
      dongStation = detectedInfo.dongStation;
    } else if (currentRegion && currentDistrict) {
      // districtMap에서 동/역 이름 찾기
      const regionKey = Object.keys(districtMap).find(
        (k) => districtMap[k].regionName === currentRegion
      );
      if (regionKey && districtMap[regionKey].districts) {
        const districtKey = Object.keys(districtMap[regionKey].districts).find(
          (k) => {
            const d = districtMap[regionKey].districts[k];
            return (
              (typeof d === 'string' ? d : d.districtsname) === currentDistrict
            );
          }
        );
        if (
          districtKey &&
          districtMap[regionKey].districts[districtKey] &&
          typeof districtMap[regionKey].districts[districtKey] === 'object'
        ) {
          dongStation =
            districtMap[regionKey].districts[districtKey].dongStations?.[
              dongStationKey
            ] || '';
        }
      }
    }
  }

  if (currentFilter && themeNames[currentFilter]) {
    // 테마 필터인 경우 지역/구 정보 포함
    const themeName = themeNames[currentFilter];
    // 동/역이 있으면 세부지역 + 동/역, 없으면 구만 표시
    if (dongStation && currentDistrict) {
      title = `${currentDistrict} ${dongStation} ${themeName}`;
    } else if (currentDistrict) {
      title = `${currentDistrict} ${themeName}`;
    } else if (currentRegion) {
      title = `${currentRegion} ${themeName}`;
    } else {
      title = themeName;
    }
  } else if (currentFilter && currentFilter !== 'all') {
    // 다른 필터 (massage, outcall 등)
    const filterNames = {
      massage: '마사지',
      outcall: '출장마사지',
      swedish: '스웨디시',
      thai: '타이마사지',
      aroma: '아로마마사지',
      chinese: '중국마사지',
      foot: '발마사지',
      waxing: '왁싱',
      spa: '스파',
    };
    const filterName = filterNames[currentFilter] || currentFilter;

    // 동/역이 있으면 세부지역 + 동/역 형식으로 표시
    if (dongStation && currentDistrict) {
      title = `${currentDistrict} ${dongStation} ${filterName}`;
    } else if (currentDistrict) {
        title = `${currentDistrict} ${filterName}`;
      } else if (currentRegion) {
        title = `${currentRegion} ${filterName}`;
      } else {
        title = filterName;
    }
  } else {
    // 전체인 경우
    const isMainPage =
      window.location.pathname.includes('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '' ||
      /\/twon\/?$/i.test(window.location.pathname);

    // spa.html 같은 경우 currentFilter가 설정되지 않았을 수 있으므로 파일명으로 확인
    const fileName = window.location.pathname.split('/').pop();
    if (fileName === 'spa.html') {
      // window.currentFilter도 확인
      if (window.currentFilter === 'spa' || !currentFilter) {
        title = '스파';
      } else if (dongStation && currentDistrict) {
        title = `${currentDistrict} ${dongStation} 마사지사이트`;
      } else if (currentDistrict) {
        title = `${currentDistrict} 마사지사이트`;
      } else if (currentRegion) {
        title = `${currentRegion} 마사지사이트`;
      } else {
        title = '스파';
      }
    } else if (dongStation && currentDistrict) {
      title = `${currentDistrict} ${dongStation} 마사지사이트`;
    } else if (currentDistrict) {
      title = `${currentDistrict} 마사지사이트`;
    } else if (currentRegion) {
      title = `${currentRegion} 마사지사이트`;
    } else {
      title = isMainPage ? '전체 마사지사이트' : '전체 마사지';
    }
  }

  console.log('Current region:', currentRegion);
  console.log('Current district:', currentDistrict);
  console.log('Current filter:', currentFilter);
  console.log('Generated title:', title);

  // title 뒤에 " 추천 BEST 샵" 추가
  if (title) {
    resultsTitle.textContent = `${title} 추천 BEST 샵`;
  } else {
    resultsTitle.textContent = title;
  }
}

// 테마 필터 초기화 함수
function initializeThemeFilter() {
  const themeBoxes = document.querySelectorAll('.theme-box');
  const themeFilterSection = document.getElementById('themeFilterSection');

  themeBoxes.forEach((box) => {
    // onclick 속성 제거
    if (box.getAttribute('onclick')) {
      box.removeAttribute('onclick');
      box.onclick = null;
    }

    // 기존 이벤트 리스너가 없을 때만 추가
    const hasEventListener = box.getAttribute('data-has-listener');
    if (!hasEventListener) {
      box.setAttribute('data-has-listener', 'true');
      box.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const selectedTheme = this.dataset.theme;
        console.log('Selected theme:', selectedTheme);

        // 모든 테마 박스에서 active 클래스 제거
        themeBoxes.forEach((b) => {
          b.classList.remove('active');
          // 다른 박스의 onclick도 제거
          if (b !== this) {
            b.removeAttribute('onclick');
            b.onclick = null;
          }
        });
        // 클릭된 박스에 active 클래스 추가
        this.classList.add('active');

        // 테마별 페이지로 이동 (전체 제외)
        if (selectedTheme !== 'all') {
          // 현재 선택된 지역과 세부지역 가져오기 (선택 박스 우선)
          const regionSelect = document.getElementById('regionSelect');
          const districtSelect = document.getElementById('districtSelect');
          const dongStationSelect =
            document.getElementById('dongStationSelect');

          let region = currentRegion;
          let district = currentDistrict;
          let dongStationKey = '';

          // 선택 박스에서 값 가져오기 (우선순위)
          if (regionSelect && regionSelect.value) {
            region = regionSelect.value;
          }
          if (districtSelect && districtSelect.value) {
            district = districtSelect.value;
          }
          // 동/역 선택값 가져오기
          if (dongStationSelect && dongStationSelect.value) {
            dongStationKey = dongStationSelect.value;
          } else {
            // 파일명에서 동/역 키 추출 (백업용)
            const currentPath = window.location.pathname;
            const currentFileName = currentPath
              .split('/')
              .pop()
              .replace('.html', '');
            const parts = currentFileName.split('-');
            const filterKeywords = [
              'massage',
              'outcall',
              'swedish',
              'thai',
              'aroma',
              'waxing',
              'chinese',
              'foot',
              'spa',
            ];

            let dongParts = [];
            for (let i = 2; i < parts.length; i++) {
              if (filterKeywords.includes(parts[i])) {
                break;
              }
              dongParts.push(parts[i]);
            }
            if (dongParts.length > 0) {
              dongStationKey = dongParts.join('-');
            }
          }

          // 중앙화된 함수로 테마 페이지 URL 생성
          const targetPage = window.getThemePageUrl
            ? window.getThemePageUrl(
                selectedTheme,
                region,
                district,
                dongStationKey
              )
            : null;
          if (targetPage) {
            window.location.href = targetPage;
            return;
          }
        }

        // 전체 선택 시 필터 적용
        currentFilter = selectedTheme;
        displayFilteredResults();

        // 드롭다운 숨기기
        const themeFilterSection =
          document.getElementById('themeFilterSection');
        if (themeFilterSection) {
          themeFilterSection.style.display = 'none';
        }

        const typeFilterBtn = document.getElementById('typeFilterBtn');
        if (typeFilterBtn) {
          typeFilterBtn.classList.add('active');
        }
      });
    }
  });
}

// 테마 필터 적용 함수
function applyThemeFilter(theme) {
  // 현재 페이지의 업체 목록을 필터링
  const massageList = document.getElementById('massageList');
  if (!massageList) return;

  // 모든 업체 카드 가져오기
  const cards = massageList.querySelectorAll('.massage-card');

  cards.forEach((card) => {
    const cardTheme = card.dataset.theme || 'all';

    if (theme === 'all' || cardTheme === theme) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // 결과 개수 업데이트
  const visibleCards = massageList.querySelectorAll(
    '.massage-card[style*="block"], .massage-card:not([style*="none"])'
  );
  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    resultsCount.textContent = `총 ${visibleCards.length}개`;
  }
}

// 외부 클릭 시 드롭다운 숨기기
function hideThemeDropdownOnOutsideClick() {
  document.addEventListener('click', function (event) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    const typeFilterBtn = document.getElementById('typeFilterBtn');

    if (themeFilterSection && typeFilterBtn) {
      // 테마보기 버튼이나 드롭다운 내부가 아닌 곳을 클릭했을 때
      if (
        !themeFilterSection.contains(event.target) &&
        !typeFilterBtn.contains(event.target)
      ) {
        hideThemeDropdown();
      }
    }
  });
}

// 스크롤 시 드롭다운 숨기기
function hideThemeDropdownOnScroll() {
  let scrollTimeout;

  window.addEventListener(
    'scroll',
    function () {
      const themeFilterSection = document.getElementById('themeFilterSection');

      if (themeFilterSection && themeFilterSection.style.display !== 'none') {
        console.log('Scroll detected, hiding dropdown');
        hideThemeDropdown();
      }
    },
    { passive: true }
  );

  // 휠 이벤트 (마우스 휠)
  window.addEventListener(
    'wheel',
    function () {
      const themeFilterSection = document.getElementById('themeFilterSection');
      if (themeFilterSection && themeFilterSection.style.display !== 'none') {
        console.log('Wheel detected, hiding dropdown');
        hideThemeDropdown();
      }
    },
    { passive: true }
  );

  // 터치 이벤트 (모바일)
  let touchStartY = 0;
  let touchStartTime = 0;

  document.addEventListener(
    'touchstart',
    function (e) {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  document.addEventListener(
    'touchmove',
    function (e) {
      const themeFilterSection = document.getElementById('themeFilterSection');
      if (themeFilterSection && themeFilterSection.style.display !== 'none') {
        const touchCurrentY = e.touches[0].clientY;
        const touchDiff = Math.abs(touchCurrentY - touchStartY);
        const timeDiff = Date.now() - touchStartTime;

        // 5px 이상 움직이거나 빠른 움직임이면 드롭다운 숨기기
        if (touchDiff > 5 || (touchDiff > 2 && timeDiff < 100)) {
          console.log('Touch movement detected, hiding dropdown');
          hideThemeDropdown();
        }
      }
    },
    { passive: true }
  );

  // 키보드 이벤트 (Page Up/Down, 화살표 키 등)
  document.addEventListener('keydown', function (e) {
    const themeFilterSection = document.getElementById('themeFilterSection');
    if (themeFilterSection && themeFilterSection.style.display !== 'none') {
      // 스크롤 관련 키들
      if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        console.log('Scroll key detected, hiding dropdown');
        hideThemeDropdown();
      }
    }
  });

  // 윈도우 리사이즈 이벤트
  window.addEventListener('resize', function () {
    const themeFilterSection = document.getElementById('themeFilterSection');
    if (themeFilterSection && themeFilterSection.style.display !== 'none') {
      console.log('Window resize detected, hiding dropdown');
      hideThemeDropdown();
    }
  });
}

// 드롭다운 숨기기 공통 함수
function hideThemeDropdown() {
  const themeFilterSection = document.getElementById('themeFilterSection');
  const typeFilterBtn = document.getElementById('typeFilterBtn');

  if (themeFilterSection) {
    themeFilterSection.style.display = 'none';
  }

  if (typeFilterBtn) {
    typeFilterBtn.classList.remove('active');
  }
}

// 중앙화된 함수: nearby-shops-title 클릭 이벤트 자동 설정
// 출장마사지 페이지는 해당 지역 + 출장마사지 필터로, 일반 페이지는 해당 지역 + 마사지 필터로 이동
window.initializeNearbyShopsTitle = function () {
  const nearbyShopsTitle =
    document.querySelector('.nearby-shops-title') ||
    document.getElementById('nearbyShopsTitleClickable');
  if (!nearbyShopsTitle) return;

  // 하드코딩된 onclick 제거
  nearbyShopsTitle.removeAttribute('onclick');
  nearbyShopsTitle.onclick = null;

  // 파일명에서 지역 정보 추출
  let fileName = window.location.pathname.split('/').pop().replace('.html', '');

  // company- 접두사 제거 (company-jeju-massage-mz.html -> jeju-massage-mz)
  if (fileName.startsWith('company-')) {
    fileName = fileName.replace('company-', '');
  }

  const parts = fileName.split('-');

  // window.districtMap 사용 (중앙화된 지역 매핑)
  const districtMap = window.districtMap || {};

  // 지역 추출 (영어 키 -> 한글 지역명)
  let region = '';
  if (parts[0] && districtMap[parts[0]]) {
    region = districtMap[parts[0]].regionName;
  }

  // 백업: JSON-LD 스키마에서 지역 정보 추출 시도
  if (!region) {
    try {
      const jsonLdScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (jsonLdScript) {
        const jsonLd = JSON.parse(jsonLdScript.textContent);
        if (jsonLd.address && jsonLd.address.addressRegion) {
          const addressRegion = jsonLd.address.addressRegion;
          // "제주특별자치도" -> "제주" 매핑
          for (const [key, value] of Object.entries(districtMap)) {
            if (
              value.regionName === addressRegion ||
              addressRegion.includes(value.regionName)
            ) {
              region = value.regionName;
              break;
            }
          }
        }
      }
    } catch (e) {
      console.warn('JSON-LD 파싱 실패:', e);
    }
  }

  // 구 추출 (영어 키 -> 한글 구명)
  let district = '';

  // 1. 파일명에서 구 정보 추출 시도
  if (parts[0] && districtMap[parts[0]] && parts[1]) {
    const regionData = districtMap[parts[0]];
    // parts[1]이 테마가 아닌 구 이름인지 확인
    const isTheme = [
      'massage',
      'outcall',
      'swedish',
      'thai',
      'aroma',
      'chinese',
      'foot',
      'waxing',
    ].includes(parts[1]);
    if (!isTheme && regionData.districts && regionData.districts[parts[1]]) {
      district = regionData.districts[parts[1]];
    }
  }

  // 2. HTML에서 구 정보 추출 시도 (여러 방법 시도)
  // 방법 1: nearbyShopsDistrict ID로 찾기 (detail.html에서 사용)
  if (!district) {
    const nearbyShopsDistrict = document.getElementById('nearbyShopsDistrict');
    if (nearbyShopsDistrict && nearbyShopsDistrict.textContent.trim()) {
      district = nearbyShopsDistrict.textContent.trim();
    }
  }

  // 방법 2: shop-district 클래스로 찾기 (업체 HTML 페이지에서 사용)
  if (!district) {
    const shopDistrict = document.querySelector('.shop-district');
    if (shopDistrict && shopDistrict.textContent.trim()) {
      const districtText = shopDistrict.textContent.trim();
      // "제주시 연동" 같은 경우 "제주시"만 추출
      // districtMap에서 매칭되는 구 이름 찾기
      if (region && districtMap[parts[0]]) {
        const regionData = districtMap[parts[0]];
        for (const [dKey, dName] of Object.entries(
          regionData.districts || {}
        )) {
          if (districtText.includes(dName)) {
            district = dName;
            break;
          }
        }
        // 매칭되지 않으면 전체 텍스트 사용하지 않고, 첫 번째 단어만 사용
        if (!district) {
          // "제주시 연동" -> "제주시" 추출
          const words = districtText.split(' ');
          if (words.length > 0) {
            district = words[0];
          }
        }
      } else {
        district = districtText;
      }
    }
  }

  // 방법 3: nearby-title-line1 클래스로 찾기
  if (!district) {
    const nearbyTitleLine1 = document.querySelector('.nearby-title-line1');
    if (nearbyTitleLine1 && nearbyTitleLine1.textContent.trim()) {
      district = nearbyTitleLine1.textContent.trim();
    }
  }

  // 디버깅 로그
  console.log('상세지역 추출 결과:', { district, parts, fileName });

  // 출장마사지 페이지 여부 확인 (HTML 요소에서 자동 판단)
  // .shop-badge 요소의 텍스트 내용을 확인하여 "출장마사지"가 포함되어 있으면 출장마사지 페이지
  const shopBadge = document.querySelector('.shop-badge');
  const isOutcall = shopBadge && shopBadge.textContent.includes('출장마사지');
  const theme = isOutcall ? 'outcall' : 'massage';

  // 출장마사지의 경우 상세지역(district) 무시하고 지역(region)만 사용
  const finalDistrict = isOutcall ? '' : district;

  // 클릭 이벤트 설정
  if (region && window.goToRegionPageWithTheme) {
    nearbyShopsTitle.onclick = function () {
      console.log('다른샵보기 클릭:', {
        region,
        district: finalDistrict,
        theme,
        isOutcall,
      });
      window.goToRegionPageWithTheme(region, finalDistrict, theme);
    };
    // 커서 포인터 스타일 추가
    nearbyShopsTitle.style.cursor = 'pointer';
  } else {
    console.warn('다른샵보기 이벤트 설정 실패:', {
      region,
      districtMap: !!window.districtMap,
      goToRegionPageWithTheme: !!window.goToRegionPageWithTheme,
    });
  }
};

// 페이지 로드 시 드래그 스크롤 초기화
document.addEventListener('DOMContentLoaded', initFilterDragScroll);

// ✅ 새로운 중앙화된 초기화 함수 실행
document.addEventListener('DOMContentLoaded', initializeApp);

// 정적 HTML 카드 정렬 (페이지 로드 시) - 한 번만 실행
function initStaticCardSorting() {
  // 이미 정렬되었으면 건너뛰기
  if (staticCardsSorted) {
    return;
  }

  // 동적 데이터면 스킵
  if (
    (Array.isArray(massageShops) && massageShops.length > 0) ||
    (typeof window !== 'undefined' &&
      Array.isArray(window.shopCardData) &&
      window.shopCardData.length > 0)
  ) {
    staticCardsSorted = true;
    return;
  }

  // massageList가 있고 정적 카드가 있는지 확인
  const massageList = document.getElementById('massageList');
  if (!massageList) {
    return;
  }

  if (massageList.children.length === 0) {
    return;
  }

  // 정적 카드가 있는지 확인
  const hasStaticCards = Array.from(massageList.children).some(
    (child) =>
      (child.classList && child.classList.contains('massage-card')) ||
      (child.querySelector && child.querySelector('.massage-card')) ||
      (child.tagName === 'A' && child.querySelector('.massage-card'))
  );

  if (hasStaticCards) {
    console.log('정적 HTML 카드 발견, 재정렬 시작...');
    sortStaticCards();
  }
}

// 즉시 실행 (스크립트 로드 시점에 실행) - requestAnimationFrame으로 최대한 빠르게
(function () {
  function runSorting() {
    if (document.readyState === 'loading') {
      // DOM이 아직 로드 중이면 DOMContentLoaded 대기
      document.addEventListener('DOMContentLoaded', function () {
        // requestAnimationFrame으로 즉시 실행 (지연 없이)
        requestAnimationFrame(function () {
          initStaticCardSorting();
        });
      });
    } else {
      // DOM이 이미 로드되었으면 requestAnimationFrame으로 즉시 실행
      requestAnimationFrame(function () {
        initStaticCardSorting();
      });
    }
  }

  // 스크립트 로드 즉시 실행 시도
  runSorting();

  // DOMContentLoaded가 이미 발생했을 수 있으므로 즉시 실행도 시도
  if (document.readyState !== 'loading') {
    requestAnimationFrame(function () {
      initStaticCardSorting();
    });
  }
})();

// DOMContentLoaded에서도 실행 (안전장치) - requestAnimationFrame 사용
document.addEventListener('DOMContentLoaded', function () {
  // 이미 정렬되었으면 건너뛰기
  if (!staticCardsSorted) {
    requestAnimationFrame(function () {
      initStaticCardSorting();
    });
  }
});

// 테마 필터 초기화
document.addEventListener('DOMContentLoaded', function () {
  initializeThemeFilter();
  hideThemeDropdownOnOutsideClick();
  hideThemeDropdownOnScroll();

  // 검색 입력창 이벤트 리스너 추가
  initializeSearchFunctionality();

  // nearby-shops-title 자동 설정
  if (typeof window.initializeNearbyShopsTitle === 'function') {
    window.initializeNearbyShopsTitle();
  }
});

// 검색 기능 초기화
function initializeSearchFunctionality() {
  const searchInput = document.getElementById('shopSearchInput');
  if (!searchInput) return;

  let searchTimeout;

  // 입력 이벤트 리스너 (디바운싱 적용)
  searchInput.addEventListener('input', function (e) {
    const query = e.target.value.trim();
    currentSearchQuery = query;

    // 타이머 클리어
    clearTimeout(searchTimeout);

    // 2글자 이상일 때만 검색 실행
    if (query.length >= 2) {
      searchTimeout = setTimeout(() => {
        displayFilteredResults();
      }, 300); // 300ms 디바운싱
    } else if (query.length === 0) {
      // 검색어가 없으면 필터만 적용
      currentSearchQuery = '';
      displayFilteredResults();
    } else {
      // 1글자일 때는 검색하지 않음 (빈 결과 표시)
      currentSearchQuery = '';
      displayFilteredResults();
    }
  });

  // Enter 키 이벤트
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = e.target.value.trim();
      currentSearchQuery = query;
      if (query.length >= 2) {
        displayFilteredResults();
      }
    }
  });

  // 검색어 지우기 (X 버튼 클릭 시)
  searchInput.addEventListener('search', function () {
    if (this.value === '') {
      currentSearchQuery = '';
      displayFilteredResults();
    }
  });

  // 검색 아이콘 클릭 이벤트
  const searchIcon = document.querySelector('.text-search-box .search-icon');
  if (searchIcon) {
    // 클릭 이벤트를 강제로 활성화
    searchIcon.style.pointerEvents = 'auto';
    searchIcon.style.cursor = 'pointer';
    searchIcon.style.touchAction = 'manipulation';

    // 검색 실행 함수
    function executeSearch() {
      // 입력 필드 포커스 제거 (가상 키보드 숨김)
      if (document.activeElement === searchInput) {
        searchInput.blur();
      }

      const query = searchInput.value.trim();
      currentSearchQuery = query;

      // 검색 실행 (1글자 이상이면 검색)
      if (query.length >= 1) {
        displayFilteredResults();
      } else if (query.length === 0) {
        // 검색어가 없으면 필터만 적용
        currentSearchQuery = '';
        displayFilteredResults();
      }
    }

    // 클릭 이벤트 리스너 (데스크톱)
    searchIcon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      // 입력 필드 포커스 제거 (가상 키보드 숨김)
      searchInput.blur();
      executeSearch();
    });

    // 터치 시작 감지 (모바일)
    let touchStartTime = 0;
    let touchMoved = false;

    searchIcon.addEventListener(
      'touchstart',
      function (e) {
        touchStartTime = Date.now();
        touchMoved = false;
        // 터치 시작 시 입력 필드 포커스 제거 (가상 키보드 방지)
        searchInput.blur();
      },
      { passive: true }
    );

    searchIcon.addEventListener(
      'touchmove',
      function (e) {
        touchMoved = true;
      },
      { passive: true }
    );

    // 터치 종료 이벤트 (모바일 지원)
    searchIcon.addEventListener(
      'touchend',
      function (e) {
        // 터치가 움직이지 않았고, 짧은 시간 내에 끝났으면 클릭으로 간주
        if (!touchMoved && Date.now() - touchStartTime < 300) {
          e.preventDefault();
          e.stopPropagation();
          // 입력 필드 포커스 제거 (가상 키보드 숨김)
          searchInput.blur();
          // 약간의 지연 후 검색 실행 (키보드가 완전히 사라진 후)
          setTimeout(function () {
            executeSearch();
          }, 100);
        }
      },
      { passive: false }
    );

    // 마우스 다운 이벤트 (데스크톱)
    searchIcon.addEventListener('mousedown', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

// header-search-btn 클릭 시 검색 박스로 스크롤 및 포커스
function bindHeaderSearchButton() {
  const button = document.getElementById('header-search-btn');
  if (button) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToSearchBox();
    });
  }
}

// 검색 박스로 스크롤하는 함수
function scrollToSearchBox() {
  const searchBox =
    document.getElementById('text-search-box') ||
    document.querySelector('.text-search-box');

  if (searchBox) {
    // 검색 박스 표시
    searchBox.style.display =
      getComputedStyle(searchBox).display === 'none' ? 'flex' : '';

    const searchInput = document.getElementById('shopSearchInput');
    if (searchInput) {
      // 포커스 설정 (스크롤 방지 옵션)
      const focusOptions = { preventScroll: true };
      try {
        searchInput.focus(focusOptions);
      } catch (error) {
        searchInput.focus();
      }

      // 커서를 입력 필드 끝으로 이동
      if (typeof searchInput.setSelectionRange === 'function') {
        const length = searchInput.value.length;
        searchInput.setSelectionRange(length, length);
      }
    }

    // 검색 박스 위치로 스크롤
    requestAnimationFrame(() => {
      const screenWidth = window.innerWidth;
      let headerHeight = 0;
      let searchBoxTop = 0;

      if (screenWidth >= 2500) {
        const header = document.getElementById('mainHeader');
        if (header) {
          headerHeight = header.offsetHeight;
        }
        const rect = searchBox.getBoundingClientRect();
        searchBoxTop = rect.top;
      }

      requestAnimationFrame(() => {
        if (screenWidth >= 2500) {
          const targetTop =
            window.pageYOffset + searchBoxTop - headerHeight - 20;
          window.scrollTo({
            top: targetTop > 0 ? targetTop : 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }
}

// filter-section과 filter-container를 header 아래에 고정하는 함수
function updateFilterStickyPosition() {
  const header = document.getElementById('mainHeader');
  const filterSection = document.querySelector('.filter-section');
  const filterContainer = document.querySelector('.filter-container');

  if (header) {
    const headerHeight = header.offsetHeight;

    // CSS 변수로 header 높이 설정
    document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );

    // filter-section을 header 바로 아래에 고정
    if (filterSection) {
      filterSection.style.top = `${headerHeight}px`;

      // filter-section 높이를 CSS 변수로 설정 (theme-filter-section 위치 계산용)
      const filterSectionHeight = filterSection.offsetHeight;
      document.documentElement.style.setProperty(
        '--filter-section-height',
        `${filterSectionHeight}px`
      );
    }

    // filter-container를 header 바로 아래에 고정 (filter-section과 같은 위치)
    if (filterContainer) {
      filterContainer.style.top = `${headerHeight}px`;
    }
  }
}

// DOMContentLoaded 시 header-search-btn 바인딩 및 filter 위치 업데이트
document.addEventListener('DOMContentLoaded', function () {
  bindHeaderSearchButton();
  updateFilterStickyPosition();

  // 스크롤 및 리사이즈 시 filter 위치 업데이트
  window.addEventListener('scroll', updateFilterStickyPosition);
  window.addEventListener('resize', updateFilterStickyPosition);
});
