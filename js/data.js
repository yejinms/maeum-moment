export const CATEGORY_ORDER = ["words", "time", "gifts", "service", "touch"];

export const CATEGORIES = {
  words: {
    id: "words",
    name: "인정하는 말",
    shortName: "말",
    icon: "“ ”",
    description: "구체적인 칭찬, 감사, 응원과 애정 표현",
  },
  time: {
    id: "time",
    name: "함께하는 시간",
    shortName: "시간",
    icon: "◷",
    description: "방해받지 않고 서로에게 집중하는 시간",
  },
  gifts: {
    id: "gifts",
    name: "의미 있는 선물",
    shortName: "선물",
    icon: "◇",
    description: "나를 기억하고 골랐다는 마음이 담긴 물건",
  },
  service: {
    id: "service",
    name: "실제적인 도움",
    shortName: "도움",
    icon: "⌁",
    description: "수고와 부담을 구체적으로 덜어주는 행동",
  },
  touch: {
    id: "touch",
    name: "동의된 접촉",
    shortName: "접촉",
    icon: "∿",
    description: "포옹, 손잡기, 기대기처럼 합의된 따뜻한 접촉",
  },
};

function question(id, track, context, scene, aCategory, aText, bCategory, bText) {
  return {
    id,
    track,
    context,
    scene,
    pair: [aCategory, bCategory].sort(),
    a: { category: aCategory, text: aText },
    b: { category: bCategory, text: bText },
  };
}

const RECEIVE_QUESTIONS = [
  question(
    "receive-words-time-01",
    "receive",
    "다툰 다음 날",
    "어제 연락 문제로 다퉜고 아직 마음이 완전히 풀리지 않았다. 관계를 회복하는 데 더 와닿는 쪽은?",
    "words",
    "연인이 자기 행동 중 무엇이 상처였는지 짚고, 같은 일이 생기면 어떻게 하겠다고 말한다.",
    "time",
    "연인이 오늘 저녁을 비워 결론을 재촉하지 않고 내 이야기를 끝까지 듣는다.",
  ),
  question(
    "receive-words-time-02",
    "receive",
    "관계의 다음 단계",
    "주변 친구들이 결혼 이야기를 꺼낸 뒤 우리 관계의 미래가 궁금해졌다. 더 안심되는 반응은?",
    "words",
    "연인이 나와 계속 함께하고 싶은 이유와 지금의 진심을 분명하게 말해준다.",
    "time",
    "연인이 주말 한나절을 내어 살고 싶은 방식과 앞으로의 계획을 차분히 맞춰본다.",
  ),
  question(
    "receive-gifts-words-01",
    "receive",
    "새 모임에 가는 날",
    "연인의 친한 친구들을 처음 만나는 자리라 괜히 긴장된다. 출발 전에 더 힘이 되는 것은?",
    "words",
    "연인이 내가 왜 친구들과 잘 어울릴 것 같은지 구체적으로 말하며 안심시켜준다.",
    "gifts",
    "연인이 우리만 아는 농담이 담긴 작은 배지를 건네며 오늘의 부적이라고 해준다.",
  ),
  question(
    "receive-gifts-words-02",
    "receive",
    "반려동물과의 이별",
    "오랫동안 함께한 반려동물을 떠나보내고 자꾸 빈자리가 느껴진다. 더 위로되는 것은?",
    "words",
    "연인이 내가 얼마나 잘 돌봤는지와 함께했던 따뜻한 장면들을 구체적으로 이야기해준다.",
    "gifts",
    "연인이 내가 좋아하던 사진을 골라 작은 추억 책으로 만들어준다.",
  ),
  question(
    "receive-service-words-01",
    "receive",
    "돈 때문에 위축된 날",
    "예상치 못한 지출이 생겨 이번 달 데이트 비용도 부담스럽다고 털어놨다. 더 고마운 반응은?",
    "service",
    "연인이 부담 없는 데이트 예산과 당분간의 지출 계획을 함께 정리해준다.",
    "words",
    "연인이 돈 때문에 미안해할 필요 없고 솔직히 말해줘서 고맙다고 분명히 말한다.",
  ),
  question(
    "receive-service-words-02",
    "receive",
    "반복되는 연락 갈등",
    "바쁠 때 연락이 끊기는 문제로 같은 서운함이 세 번째 생겼다. 더 믿음이 가는 반응은?",
    "words",
    "연인이 변명하지 않고 내가 외로웠던 지점을 자기 말로 정확히 이해해준다.",
    "service",
    "연인이 바쁜 날의 연락 기준을 함께 정하고 실제 일정에 알림까지 설정한다.",
  ),
  question(
    "receive-touch-words-01",
    "receive",
    "질투가 올라온 자리",
    "모임에서 연인이 다른 사람과 유난히 친밀해 보여 마음이 불편해졌다. 밖으로 나온 뒤 더 안심되는 것은?",
    "words",
    "연인이 내 마음을 예민하다고 넘기지 않고, 우리 관계에 대한 확신을 말해준다.",
    "touch",
    "연인이 괜찮은지 묻고, 내가 원하자 손을 단단히 잡은 채 함께 집으로 간다.",
  ),
  question(
    "receive-touch-words-02",
    "receive",
    "사과 후의 어색함",
    "서로 사과는 했지만 역 플랫폼에서 헤어지려니 아직 어색하다. 마지막에 더 마음이 풀리는 것은?",
    "touch",
    "연인이 안아도 괜찮은지 묻고, 내가 고개를 끄덕이자 천천히 안아준다.",
    "words",
    "연인이 오늘 대화에서 고마웠던 점과 앞으로 달라지고 싶은 점을 짧게 말한다.",
  ),
  question(
    "receive-gifts-time-01",
    "receive",
    "돈 안 쓰는 주말",
    "둘 다 지출을 줄이기로 한 주말, 연인이 준비한 데이트 중 더 기대되는 것은?",
    "time",
    "연인이 무료 전시와 공원 산책 코스를 찾아 하루를 온전히 함께 보낸다.",
    "gifts",
    "연인이 중고서점에서 내 취향을 떠올려 고른 오래된 책 한 권을 건넨다.",
  ),
  question(
    "receive-gifts-time-02",
    "receive",
    "내가 만든 것을 공개한 날",
    "처음 만든 사진집을 작은 전시에 걸었다. 연인의 축하 중 더 뿌듯한 것은?",
    "gifts",
    "연인이 작품의 한 장면을 골라 오래 간직할 수 있는 작은 인화물로 만들어준다.",
    "time",
    "연인이 오프닝부터 마감까지 자리를 지키며 내 사람들과 전시를 함께 즐긴다.",
  ),
  question(
    "receive-service-time-01",
    "receive",
    "집안일이 밀린 휴일",
    "오랜만에 둘 다 쉬지만 집에는 빨래와 설거지가 잔뜩 쌓여 있다. 더 사랑받는다고 느끼는 선택은?",
    "service",
    "연인이 내가 쉬는 동안 밀린 집안일을 맡아 생활의 부담을 줄여준다.",
    "time",
    "연인이 집안일은 최소한만 하고 휴대폰 없이 둘만의 느긋한 하루를 보내자고 한다.",
  ),
  question(
    "receive-service-time-02",
    "receive",
    "이직과 이사의 갈림길",
    "좋은 제안을 받았지만 다른 지역으로 옮겨야 해서 관계까지 고민된다. 더 든든한 반응은?",
    "time",
    "연인이 답을 정해주지 않고 한 저녁 동안 내가 원하는 삶을 천천히 듣는다.",
    "service",
    "연인이 교통·주거비와 만날 수 있는 주기를 표로 정리해 현실적인 선택을 돕는다.",
  ),
  question(
    "receive-time-touch-01",
    "receive",
    "가족 모임에서 지친 순간",
    "낯선 가족들이 많은 자리에서 계속 긴장해 있다. 연인이 알아챘을 때 더 편안한 것은?",
    "time",
    "연인이 나와 잠시 밖으로 나와 단둘이 숨 돌리고 이야기를 나눈다.",
    "touch",
    "연인이 괜찮은지 눈으로 확인하고 테이블 아래에서 내 손을 잡아준다.",
  ),
  question(
    "receive-time-touch-02",
    "receive",
    "스킨십 속도가 다른 때",
    "요즘 서로 원하는 스킨십의 속도가 달라 조금 조심스러워졌다. 더 친밀하다고 느끼는 것은?",
    "touch",
    "연인이 내가 편한 범위를 확인하고 그 안에서 손을 잡고 다정하게 기대어 있는다.",
    "time",
    "연인이 시간을 충분히 내어 각자 편한 것과 불편한 것을 판단 없이 대화한다.",
  ),
  question(
    "receive-gifts-service-01",
    "receive",
    "반려동물을 맞이하기 전",
    "곧 구조한 고양이가 집에 온다. 연인이 한 가지를 준비해준다면 더 설레는 것은?",
    "gifts",
    "연인이 이름과 내 취향을 반영한 목걸이표를 골라 선물한다.",
    "service",
    "연인이 위험한 전선과 창문을 점검하고 집을 안전하게 정리해준다.",
  ),
  question(
    "receive-gifts-service-02",
    "receive",
    "처음 생긴 작업 공간",
    "집 한쪽에 작은 작업 공간을 만들었지만 아직 어수선하다. 더 기분 좋은 도움은?",
    "service",
    "연인이 케이블과 조명을 정리해 바로 집중할 수 있는 환경을 만들어준다.",
    "gifts",
    "연인이 내 취향과 작업을 떠올려 고른 작은 데스크 오브제를 놓아준다.",
  ),
  question(
    "receive-gifts-touch-01",
    "receive",
    "첫 공연을 마친 순간",
    "작은 무대였지만 처음으로 사람들 앞에서 공연을 마쳤다. 내려오자마자 더 벅찬 축하는?",
    "touch",
    "연인이 안아도 되는지 묻고, 내가 고개를 끄덕이자 기쁘게 꽉 안아준다.",
    "gifts",
    "연인이 오늘 날짜와 공연 제목을 적은 작은 꽃다발을 건넨다.",
  ),
  question(
    "receive-gifts-touch-02",
    "receive",
    "장거리 연애를 시작하는 날",
    "한동안 다른 도시에서 지내게 되어 기차 시간이 다가온다. 더 오래 힘이 될 작별은?",
    "gifts",
    "연인이 떨어져 있을 때 펼쳐보라며 짧은 메모가 든 작은 봉투들을 건넨다.",
    "touch",
    "연인이 괜찮은지 묻고 출발 안내가 나올 때까지 손을 잡고 곁에 있는다.",
  ),
  question(
    "receive-service-touch-01",
    "receive",
    "사람 많은 축제에서",
    "소음과 인파 때문에 갑자기 숨이 가빠지고 머리가 멍해졌다. 더 즉각적으로 안심되는 것은?",
    "service",
    "연인이 가장 가까운 조용한 출구를 찾아 이동시키고 돌아갈 교통편을 확인한다.",
    "touch",
    "연인이 손을 잡아도 되는지 묻고 내가 원하는 압력으로 손을 감싸준다.",
  ),
  question(
    "receive-service-touch-02",
    "receive",
    "생활 습관으로 다툰 뒤",
    "온도와 수면 습관 차이로 예민하게 다퉜다가 진정됐다. 더 화해했다고 느끼는 행동은?",
    "touch",
    "연인이 가까이 앉아도 되는지 묻고, 내가 원하자 등을 기대고 손을 잡아준다.",
    "service",
    "연인이 침구와 알람을 다시 맞춰 둘 다 편한 수면 환경을 바로 만든다.",
  ),
];

const EXPRESS_QUESTIONS = [
  question(
    "express-words-time-01",
    "express",
    "낯선 취미에 빠진 연인",
    "연인이 내가 잘 모르는 취미로 첫 대회에 나가게 됐다. 내가 더 자연스럽게 하고 싶은 응원은?",
    "words",
    "준비하면서 달라진 점과 멋있다고 느낀 부분을 구체적으로 말해준다.",
    "time",
    "규칙을 미리 알아보고 대회 당일 처음부터 끝까지 함께한다.",
  ),
  question(
    "express-words-time-02",
    "express",
    "꺼내기 어려웠던 가족 이야기",
    "연인이 오래 숨겨온 가족 문제를 처음 털어놨다. 내가 먼저 건네고 싶은 것은?",
    "time",
    "오늘 계획을 미루고 연인이 멈추고 싶을 때까지 차분히 들어준다.",
    "words",
    "말해줘서 고맙고 그 일로 연인을 다르게 보지 않는다고 분명히 전한다.",
  ),
  question(
    "express-gifts-words-01",
    "express",
    "처음 떠나는 혼자 여행",
    "연인이 처음으로 일주일간 혼자 여행을 떠나 조금 긴장해한다. 나는?",
    "words",
    "혼자서도 잘 해낼 거라고 믿는 이유와 돌아와서 듣고 싶은 이야기를 메시지로 보낸다.",
    "gifts",
    "여행 중 나를 떠올릴 수 있도록 우리만 아는 표시가 담긴 작은 짐표를 건넨다.",
  ),
  question(
    "express-gifts-words-02",
    "express",
    "없애려는 옛 작업물",
    "연인이 예전에 만든 글과 그림이 부끄럽다며 모두 지우려 한다. 나는?",
    "gifts",
    "연인이 특히 좋아했던 작품만 골라 작은 개인용 책으로 묶어준다.",
    "words",
    "그중 어떤 장면이 아직도 내 마음에 남아 있는지 구체적으로 들려준다.",
  ),
  question(
    "express-service-words-01",
    "express",
    "가족의 갑작스러운 입원",
    "연인의 가족이 갑자기 입원해 연인이 경황이 없다. 내가 먼저 하고 싶은 것은?",
    "service",
    "필요한 물건과 식사를 챙기고 병원까지 오가는 일정을 구체적으로 나눠 맡는다.",
    "words",
    "혼자 감당하지 않아도 되고 필요한 만큼 곁에 있겠다고 분명히 말한다.",
  ),
  question(
    "express-service-words-02",
    "express",
    "퇴사를 결정한 날",
    "연인이 오래 고민하다 다음 계획 없이 퇴사하기로 했다. 나는?",
    "words",
    "쉽지 않은 결정을 존중하며 왜 그 선택이 용기 있다고 느끼는지 말한다.",
    "service",
    "당장 필요한 보험·생활비·행정 일정을 함께 확인해 불확실성을 줄인다.",
  ),
  question(
    "express-touch-words-01",
    "express",
    "온라인에서 상처받은 밤",
    "연인이 올린 글에 모욕적인 댓글이 달려 계속 마음에 걸린다고 한다. 나는?",
    "touch",
    "안겨 있고 싶은지 묻고 원한다면 소파에서 편안히 기대게 한다.",
    "words",
    "그 댓글이 왜 부당한지와 내가 아는 연인의 모습을 구체적으로 말해준다.",
  ),
  question(
    "express-touch-words-02",
    "express",
    "내 애정 표현을 거절한 뒤",
    "연인이 오늘은 스킨십하고 싶지 않다고 말한 뒤 미안해한다. 나는?",
    "words",
    "미안할 일이 아니며 편한 경계를 말해줘서 고맙다고 표현한다.",
    "touch",
    "지금 편한 접촉이 따로 있는지 묻고, 원한다면 손만 가볍게 잡는다.",
  ),
  question(
    "express-gifts-time-01",
    "express",
    "연인의 깊은 취향",
    "연인이 좋아하는 독립 작가의 팝업이 열리지만 나는 그 분야를 잘 모른다. 나는?",
    "time",
    "연인이 왜 좋아하는지 들으며 팝업을 처음부터 끝까지 같이 둘러본다.",
    "gifts",
    "오랫동안 찾던 작가의 절판 핀을 알아내어 선물한다.",
  ),
  question(
    "express-gifts-time-02",
    "express",
    "기차가 세 시간 멈춘 날",
    "여행 가는 기차가 고장으로 멈춰 계획이 모두 꼬였다. 나는?",
    "gifts",
    "역 매점에서 연인의 취향대로 고른 작은 여행 간식 꾸러미를 건넨다.",
    "time",
    "도착 시간 걱정은 잠시 내려두고 함께 게임하고 이야기하며 기다린다.",
  ),
  question(
    "express-service-time-01",
    "express",
    "시차가 큰 장거리 연애",
    "한동안 시차가 열 시간 나는 곳에서 지내게 됐다. 내가 먼저 맞추고 싶은 것은?",
    "service",
    "서로 무리하지 않을 연락 시간표와 다음 만남의 이동 계획을 정리한다.",
    "time",
    "일주일에 한 번은 다른 일을 하지 않고 영상 통화에만 집중하는 시간을 만든다.",
  ),
  question(
    "express-service-time-02",
    "express",
    "명절 가족 모임",
    "연인이 내 가족 모임에 처음 오래 머물러야 해서 부담스러워한다. 나는?",
    "time",
    "모임 내내 연인을 혼자 두지 않고 함께 다니며 틈틈이 상태를 살핀다.",
    "service",
    "연인이 곤란해할 질문을 가족에게 미리 막고 언제 나올지 이동 계획을 마련한다.",
  ),
  question(
    "express-time-touch-01",
    "express",
    "상담을 받고 나온 길",
    "연인이 상담을 마치고 나왔지만 지금은 자세히 말하기 어렵다고 한다. 나는?",
    "touch",
    "말 대신 손을 잡아도 되는지 묻고 연인의 속도에 맞춰 조용히 걷는다.",
    "time",
    "근처에 함께 머물며 말하고 싶어질 때까지 재촉 없이 시간을 보낸다.",
  ),
  question(
    "express-time-touch-02",
    "express",
    "사람들 앞의 애정 표현",
    "연인이 공개적인 스킨십은 어색하지만 친구 모임에서 우리 사이가 소원해 보일까 걱정한다. 나는?",
    "time",
    "모임 전후로 둘만의 시간을 충분히 보내며 서로에게 집중한다.",
    "touch",
    "연인이 편하다고 한 범위에서 어깨를 맞대거나 손끝을 가볍게 잡는다.",
  ),
  question(
    "express-gifts-service-01",
    "express",
    "아끼던 물건이 깨진 날",
    "연인이 매일 쓰던 오래된 머그가 깨져 많이 아쉬워한다. 나는?",
    "gifts",
    "비슷한 모양에 우리만의 문구를 더한 새 머그를 찾아 건넨다.",
    "service",
    "다치지 않게 조각을 치우고 다시 깨지지 않도록 수납 선반을 손본다.",
  ),
  question(
    "express-gifts-service-02",
    "express",
    "베란다 텃밭의 시작",
    "연인이 작은 베란다 텃밭을 시작해보고 싶다고 한다. 내가 하고 싶은 응원은?",
    "service",
    "흙이 새지 않도록 자리를 만들고 무거운 화분 설치를 함께 끝낸다.",
    "gifts",
    "연인이 좋아하는 채소와 이름표가 담긴 작은 씨앗 키트를 골라준다.",
  ),
  question(
    "express-gifts-touch-01",
    "express",
    "둘만의 사진을 남기는 날",
    "데이트 중 즉석 사진관을 발견했다. 내가 더 남기고 싶은 애정 표현은?",
    "touch",
    "연인이 편한 포즈를 묻고 어깨를 감싸거나 볼을 맞대 다정하게 찍는다.",
    "gifts",
    "사진 한 장을 꾸며 뒷면에 오늘의 기억을 적어 연인에게 건넨다.",
  ),
  question(
    "express-gifts-touch-02",
    "express",
    "검사 결과를 기다리는 날",
    "연인이 병원 검사 결과를 기다리며 불안해한다. 대기실에서 나는?",
    "gifts",
    "평소 안정감을 느낀다고 한 작은 촉감 인형을 가져와 손에 쥐여준다.",
    "touch",
    "손을 잡아도 되는지 묻고 결과를 들을 때까지 곁에서 손을 놓지 않는다.",
  ),
  question(
    "express-service-touch-01",
    "express",
    "공항에서 길을 잃은 순간",
    "환승 시간이 촉박한데 연인이 복잡한 공항에서 당황해 굳어버렸다. 나는?",
    "service",
    "탑승구와 가장 빠른 경로를 확인하고 짐을 나눠 들어 이동을 이끈다.",
    "touch",
    "손을 잡아도 되는지 묻고 함께 호흡을 맞추며 진정될 때까지 기다린다.",
  ),
  question(
    "express-service-touch-02",
    "express",
    "갑자기 쏟아진 비",
    "야외 데이트 중 비가 쏟아져 연인이 젖은 채 추워한다. 나는?",
    "touch",
    "괜찮은지 묻고 내 겉옷 안으로 가까이 안아 체온을 나눈다.",
    "service",
    "가장 가까운 실내와 이동 수단을 찾고 젖은 짐을 대신 챙긴다.",
  ),
];

export const QUESTIONS = [...RECEIVE_QUESTIONS, ...EXPRESS_QUESTIONS];

export function getQuestions(track) {
  return QUESTIONS.filter((item) => item.track === track);
}

export function getQuestionById(questionId) {
  return QUESTIONS.find((item) => item.id === questionId);
}

export function validateQuestionSet(questions = QUESTIONS) {
  const errors = [];
  const ids = new Set();
  const contexts = new Set();

  for (const item of questions) {
    if (ids.has(item.id)) errors.push(`Duplicate question id: ${item.id}`);
    ids.add(item.id);

    if (contexts.has(item.context)) {
      errors.push(`Duplicate question context: ${item.context}`);
    }
    contexts.add(item.context);

    if (!["receive", "express"].includes(item.track)) {
      errors.push(`Invalid track: ${item.id}`);
    }

    const pair = [item.a.category, item.b.category].sort();
    if (new Set(pair).size !== 2 || pair.some((id) => !CATEGORIES[id])) {
      errors.push(`Invalid category pair: ${item.id}`);
    }
    if (pair.join("|") !== item.pair.join("|")) {
      errors.push(`Pair metadata mismatch: ${item.id}`);
    }
    if (!item.scene.trim() || !item.a.text.trim() || !item.b.text.trim()) {
      errors.push(`Missing copy: ${item.id}`);
    }
  }

  for (const track of ["receive", "express"]) {
    const trackQuestions = questions.filter((item) => item.track === track);
    if (trackQuestions.length !== 20) {
      errors.push(`${track} must contain 20 questions`);
    }
    if (new Set(trackQuestions.map((item) => item.context)).size !== 20) {
      errors.push(`${track} must contain 20 unique contexts`);
    }

    const pairCounts = new Map();
    for (const item of trackQuestions) {
      const key = item.pair.join("|");
      pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
    }
    if (pairCounts.size !== 10) {
      errors.push(`${track} must contain 10 unique pairs`);
    }
    for (const [pair, count] of pairCounts) {
      if (count !== 2) errors.push(`${track} pair ${pair} appears ${count} times`);
    }
  }

  return { valid: errors.length === 0, errors };
}
