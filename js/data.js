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
    "상처 줬던 행동을 짚어 사과하고, 같은 일이 생기면 어떻게 달라질지 약속한다.",
    "time",
    "오늘 저녁 약속을 비우고 내 감정이 가라앉을 때까지 곁에서 대화를 이어간다.",
  ),
  question(
    "receive-words-time-02",
    "receive",
    "관계의 다음 단계",
    "주변 친구들이 결혼 이야기를 꺼낸 뒤 우리 관계의 미래가 궁금해졌다. 더 안심되는 반응은?",
    "words",
    "나와 계속 만나고 싶은 마음과 그 이유를 솔직하게 들려준다.",
    "time",
    "주말 한나절 동안 서로 원하는 삶과 앞으로의 계획을 차분히 맞춰본다.",
  ),
  question(
    "receive-gifts-words-01",
    "receive",
    "새 모임에 가는 날",
    "연인의 친한 친구들을 처음 만나는 자리라 괜히 긴장된다. 출발 전에 더 힘이 되는 것은?",
    "words",
    "가기 전 “내 친구들도 너를 좋아할 거야”라며 자신감을 북돋운다.",
    "gifts",
    "내가 좋아하는 음료를 미리 사 와 긴장을 풀 수 있게 챙겨준다.",
  ),
  question(
    "receive-gifts-words-02",
    "receive",
    "자신감이 떨어진 날",
    "거울을 보다 요즘 내가 매력 없어 보인다고 털어놨다. 더 힘이 되는 반응은?",
    "words",
    "내가 매력적이라고 느꼈던 순간들을 떠올려 하나씩 들려준다.",
    "gifts",
    "내 취향을 기억해 둔 디저트를 사 와 함께 나눠 먹는다.",
  ),
  question(
    "receive-service-words-01",
    "receive",
    "돈 때문에 위축된 날",
    "예상치 못한 지출이 생겨 이번 달 데이트 비용도 부담스럽다고 털어놨다. 더 고마운 반응은?",
    "service",
    "이번 달에는 돈 들지 않는 데이트를 하자며 실제 약속과 비용을 조정한다.",
    "words",
    "부담을 느낄 필요 없다며 솔직히 털어놔줘서 오히려 고맙다고 한다.",
  ),
  question(
    "receive-service-words-02",
    "receive",
    "반복되는 연락 갈등",
    "바쁠 때 연락이 끊기는 문제로 같은 서운함이 세 번째 생겼다. 더 믿음이 가는 반응은?",
    "words",
    "변명부터 하지 않고, 연락이 없을 때 내가 어떤 기분이었을지 헤아려준다.",
    "service",
    "바쁜 날에는 짧게라도 먼저 알리기로 하고 그 약속을 이후 실제로 지킨다.",
  ),
  question(
    "receive-touch-words-01",
    "receive",
    "질투가 올라온 자리",
    "모임에서 연인이 다른 사람과 유난히 친밀해 보여 마음이 불편해졌다. 밖으로 나온 뒤 더 안심되는 것은?",
    "words",
    "내 마음을 예민하다고 넘기지 않고 “내게 가장 가까운 사람은 너야”라고 안심시킨다.",
    "touch",
    "말없이 내 손을 잡고 집에 가는 동안 가까이 붙어 걷는다.",
  ),
  question(
    "receive-touch-words-02",
    "receive",
    "사과 후의 어색함",
    "서로 사과는 했지만 역 플랫폼에서 헤어지려니 아직 어색하다. 마지막에 더 마음이 풀리는 것은?",
    "touch",
    "헤어지기 전 나를 한 번 꼭 안아 어색하게 남은 거리를 녹인다.",
    "words",
    "집에 도착한 뒤 오늘 대화가 고마웠다는 짧은 음성 메시지를 보낸다.",
  ),
  question(
    "receive-gifts-time-01",
    "receive",
    "돈 안 쓰는 주말",
    "둘 다 지출을 줄이기로 한 주말, 연인이 준비한 데이트 중 더 기대되는 것은?",
    "time",
    "무료 전시와 공원 산책 코스를 찾아 하루를 온전히 함께 보낸다.",
    "gifts",
    "중고서점에서 내가 좋아할 만한 오래된 책 한 권을 찾아온다.",
  ),
  question(
    "receive-gifts-time-02",
    "receive",
    "갑자기 비는 토요일",
    "서로 별 계획 없던 토요일 오후, 연인이 먼저 제안한 것 중 더 기대되는 것은?",
    "gifts",
    "평소 먹고 싶다고 했던 디저트를 포장해 집으로 찾아온다.",
    "time",
    "동네에서 한 번도 안 가본 곳을 함께 걸으며 느긋하게 오후를 보낸다.",
  ),
  question(
    "receive-service-time-01",
    "receive",
    "집안일이 밀린 휴일",
    "오랜만에 둘 다 쉬지만 집에는 빨래와 설거지가 잔뜩 쌓여 있다. 더 사랑받는다고 느끼는 선택은?",
    "service",
    "밀린 빨래와 설거지를 맡아 내가 푹 쉴 수 있게 한다.",
    "time",
    "집안일은 최소한만 하고 휴대폰을 치운 채 늦은 아침부터 하루를 같이 보낸다.",
  ),
  question(
    "receive-service-time-02",
    "receive",
    "이직과 이사의 갈림길",
    "좋은 제안을 받았지만 다른 지역으로 옮겨야 해서 관계까지 고민된다. 더 든든한 반응은?",
    "time",
    "답을 정해주지 않고 한 저녁 동안 내가 원하는 삶을 천천히 들어준다.",
    "service",
    "각 도시의 생활비와 실제로 만날 수 있는 방법을 함께 알아본다.",
  ),
  question(
    "receive-time-touch-01",
    "receive",
    "가족 모임에서 지친 순간",
    "낯선 가족들이 많은 자리에서 계속 긴장해 있다. 연인이 알아챘을 때 더 편안한 것은?",
    "time",
    "나와 잠시 밖으로 나와 단둘이 숨을 돌리고 다른 이야기를 나눈다.",
    "touch",
    "테이블 아래에서 내 손을 살짝 잡아 ‘여기 함께 있다’는 느낌을 준다.",
  ),
  question(
    "receive-time-touch-02",
    "receive",
    "스킨십 속도가 다른 때",
    "요즘 서로 원하는 스킨십의 속도가 달라 조금 조심스러워졌다. 더 친밀하다고 느끼는 것은?",
    "touch",
    "서로 편한 접촉을 확인한 뒤 소파에서 가볍게 기대어 앉는다.",
    "time",
    "시간을 충분히 내어 각자 편한 것과 불편한 것을 판단 없이 대화한다.",
  ),
  question(
    "receive-gifts-service-01",
    "receive",
    "새 휴대폰을 산 날",
    "휴대폰을 바꿨는데 옮겨야 할 것도 많고 아직 내 것 같지 않다. 더 반가운 것은?",
    "gifts",
    "내가 좋아하는 색과 취향에 맞는 케이스를 준비해 끼워준다.",
    "service",
    "사진과 앱을 옮기고 귀찮은 초기 설정까지 끝내준다.",
  ),
  question(
    "receive-gifts-service-02",
    "receive",
    "첫 여행을 앞둔 밤",
    "내일 함께 떠나는 여행인데 아직 짐을 제대로 싸지 못했다. 더 고마운 것은?",
    "service",
    "빠진 준비물을 확인하고 복잡한 짐 정리를 나눠 맡는다.",
    "gifts",
    "내가 찾고 있던 여행용 파우치를 미리 준비해 가방에 넣어준다.",
  ),
  question(
    "receive-gifts-touch-01",
    "receive",
    "긴 과정을 마친 날",
    "몇 달 동안 준비한 과정을 마치고 수료식장을 나왔다. 더 벅찬 축하는?",
    "touch",
    "사람들 사이에서 반갑게 끌어안고 등을 힘차게 두드려준다.",
    "gifts",
    "과정을 마친 날짜가 적힌 꽃 한 송이를 준비해 기다린다.",
  ),
  question(
    "receive-gifts-touch-02",
    "receive",
    "장거리 연애를 시작하는 날",
    "한동안 다른 도시에서 지내게 되어 기차 시간이 다가온다. 더 오래 힘이 될 작별은?",
    "gifts",
    "떨어져 지낼 때 열어볼 짧은 편지를 가방 안에 넣어준다.",
    "touch",
    "출발 안내가 나올 때까지 허리를 가볍게 감싼 채 개찰구 앞에 함께 선다.",
  ),
  question(
    "receive-service-touch-01",
    "receive",
    "아무 말도 하기 싫은 날",
    "별일을 설명할 힘도 없이 그냥 혼자 있고 싶을 만큼 지쳤다. 연인이 곁에 왔을 때 더 편안한 것은?",
    "service",
    "먹을 것을 챙기고 내가 미뤄둔 설거지를 조용히 끝낸다.",
    "touch",
    "소파 옆에 붙어 앉아 말없이 등을 천천히 토닥인다.",
  ),
  question(
    "receive-service-touch-02",
    "receive",
    "생활 습관으로 다툰 뒤",
    "온도와 수면 습관 차이로 예민하게 다퉜다가 진정됐다. 더 화해했다고 느끼는 행동은?",
    "touch",
    "화해한 뒤 한 이불을 덮고 누워 서로의 발끝을 가볍게 맞댄다.",
    "service",
    "침구와 알람을 다시 맞춰 둘 다 편한 수면 환경을 바로 만든다.",
  ),
];

const EXPRESS_QUESTIONS = [
  question(
    "express-words-time-01",
    "express",
    "낯선 취미에 빠진 연인",
    "연인이 내가 잘 모르는 취미로 첫 대회에 나가게 됐다. 내가 더 자연스럽게 하고 싶은 응원은?",
    "words",
    "대회 전날 잘해온 장면을 떠올려 짧은 응원 메시지를 보낸다.",
    "time",
    "규칙을 미리 배워두고 대회 당일 처음부터 끝까지 함께 응원한다.",
  ),
  question(
    "express-words-time-02",
    "express",
    "꺼내기 어려웠던 가족 이야기",
    "연인이 오래 숨겨온 가족 문제를 처음 털어놨다. 내가 먼저 건네고 싶은 것은?",
    "time",
    "오늘 계획을 접고 연인이 멈추고 싶을 때까지 차분히 들어준다.",
    "words",
    "나를 믿고 털어놔줘서 고맙고, 그 일로 다르게 보지 않는다고 전한다.",
  ),
  question(
    "express-gifts-words-01",
    "express",
    "처음 떠나는 혼자 여행",
    "연인이 처음으로 일주일간 혼자 여행을 떠나 조금 긴장해한다. 나는?",
    "words",
    "출발 전날 혼자서도 잘 해낼 거라 믿는 이유를 음성 메시지로 남긴다.",
    "gifts",
    "여행 내내 쓸 수 있는 이름표를 골라 캐리어에 달아준다.",
  ),
  question(
    "express-gifts-words-02",
    "express",
    "처음 자취를 시작한 연인",
    "연인이 처음 혼자 살게 되어 설레면서도 생활을 잘 꾸릴 수 있을지 걱정한다. 나는?",
    "gifts",
    "새집에서 매일 쓸 수 있도록 좋아하는 색의 머그를 첫 선물로 준비한다.",
    "words",
    "혼자서도 자기다운 집을 잘 만들어갈 사람이라고 힘을 북돋운다.",
  ),
  question(
    "express-service-words-01",
    "express",
    "할 일이 몰린 주말",
    "연인은 약속과 집안일이 한꺼번에 겹쳐 어디서부터 해야 할지 모르겠다고 한다. 나는?",
    "service",
    "장보기와 택배 반품 중 하나를 맡아 해야 할 일을 실제로 줄여준다.",
    "words",
    "오늘 모든 일을 완벽하게 끝내지 않아도 괜찮다고 마음을 가볍게 해준다.",
  ),
  question(
    "express-service-words-02",
    "express",
    "퇴사를 결정한 날",
    "연인이 오래 고민하다 다음 계획 없이 퇴사하기로 했다. 나는?",
    "words",
    "더 버티지 않고 자신을 지킨 선택이 용기 있다고 인정해준다.",
    "service",
    "당장 막힌 행정 처리나 지출 항목 하나를 골라 같이 해결한다.",
  ),
  question(
    "express-touch-words-01",
    "express",
    "온라인에서 상처받은 밤",
    "연인이 올린 글에 모욕적인 댓글이 달려 계속 마음에 걸린다고 한다. 나는?",
    "touch",
    "옆에 바짝 붙어 앉아 헝클어진 머리를 천천히 쓰다듬어준다.",
    "words",
    "그 댓글보다 내가 직접 봐온 연인의 모습이 훨씬 진짜라고 다독인다.",
  ),
  question(
    "express-touch-words-02",
    "express",
    "내 애정 표현을 거절한 뒤",
    "연인이 오늘은 스킨십하고 싶지 않다고 말한 뒤 미안해한다. 나는?",
    "words",
    "미안해할 일이 아니며 자기 경계를 알려줘서 고맙다고 표현한다.",
    "touch",
    "지금 편한 접촉이 있는지 확인하고, 원한다면 손만 가볍게 잡는다.",
  ),
  question(
    "express-gifts-time-01",
    "express",
    "기다리던 영화가 개봉한 날",
    "연인이 몇 달 전부터 기다리던 영화가 드디어 개봉했다. 나는?",
    "time",
    "첫 주말 표를 예매해 같이 보고, 끝난 뒤 늦게까지 감상을 나눈다.",
    "gifts",
    "연인이 좋아했던 장면이 담긴 공식 포스터를 찾아 선물한다.",
  ),
  question(
    "express-gifts-time-02",
    "express",
    "아무 일정 없는 일요일",
    "연인이 오랜만에 아무 약속도 없는 일요일을 맞았다. 나는?",
    "gifts",
    "좋아하는 빵과 커피를 사 들고 연인의 집으로 간다.",
    "time",
    "하고 싶은 일을 즉석에서 정하며 하루를 느긋하게 같이 보낸다.",
  ),
  question(
    "express-service-time-01",
    "express",
    "시차가 큰 장거리 연애",
    "한동안 시차가 열 시간 나는 곳에서 지내게 됐다. 내가 먼저 맞추고 싶은 것은?",
    "service",
    "서로 덜 피곤한 연락 시간과 다음 방문 교통편을 미리 맞춘다.",
    "time",
    "일주일에 한 번은 다른 일을 멈추고 영상 통화에만 집중한다.",
  ),
  question(
    "express-service-time-02",
    "express",
    "명절 가족 모임",
    "연인이 내 가족 모임에 처음 오래 머물러야 해서 부담스러워한다. 나는?",
    "time",
    "모임 내내 연인을 혼자 두지 않고 함께 다니며 틈틈이 눈을 맞춘다.",
    "service",
    "곤란한 질문을 자연스럽게 끊고 피곤해지면 함께 나올 신호를 정해둔다.",
  ),
  question(
    "express-time-touch-01",
    "express",
    "말수가 줄어든 데이트",
    "데이트 도중 연인이 평소보다 말수가 적고 생각이 많아 보인다. 나는?",
    "touch",
    "나란히 걸으며 팔짱을 끼고 연인의 느린 보폭에 맞춘다.",
    "time",
    "조용한 카페에 자리를 잡고 말하고 싶어질 때까지 재촉 없이 머문다.",
  ),
  question(
    "express-time-touch-02",
    "express",
    "느긋한 주말 아침",
    "둘 다 아무 일정 없는 주말 아침, 내가 더 자연스럽게 표현하는 것은?",
    "time",
    "함께 아침을 만들고 식탁에 오래 앉아 이번 주 이야기를 나눈다.",
    "touch",
    "이불 속에서 한동안 꼭 안고 게으르게 아침을 보낸다.",
  ),
  question(
    "express-gifts-service-01",
    "express",
    "아끼던 물건이 깨진 날",
    "연인이 매일 쓰던 오래된 머그가 깨져 많이 아쉬워한다. 나는?",
    "gifts",
    "평소 좋아하던 색과 크기를 기억해 비슷한 새 컵을 찾아준다.",
    "service",
    "깨진 조각을 치우고 아끼던 머그를 수리할 방법을 알아본다.",
  ),
  question(
    "express-gifts-service-02",
    "express",
    "처음 요리에 도전하는 날",
    "연인이 처음 만들어보는 요리에 도전하며 레시피를 들여다보고 있다. 나는?",
    "service",
    "재료 손질을 나눠 하고 식사가 끝난 뒤 설거지를 맡는다.",
    "gifts",
    "평소 갖고 싶다던 앞치마나 조리도구를 준비해준다.",
  ),
  question(
    "express-gifts-touch-01",
    "express",
    "둘만의 사진을 남기는 날",
    "데이트 중 즉석 사진관을 발견했다. 내가 더 남기고 싶은 애정 표현은?",
    "touch",
    "볼을 맞대고 장난스러운 표정을 지으며 다정한 포즈로 찍는다.",
    "gifts",
    "사진 한 장 뒷면에 오늘의 기억을 적어 연인의 지갑에 넣어준다.",
  ),
  question(
    "express-gifts-touch-02",
    "express",
    "중요한 발표 직전",
    "연인이 잠시 뒤 중요한 발표를 앞두고 손이 차가울 만큼 긴장한다. 나는?",
    "gifts",
    "좋아하는 간식과 짧은 응원 메모를 가방 안에 넣어둔다.",
    "touch",
    "차가워진 두 손을 꼭 감싸고 손등을 천천히 쓸어준다.",
  ),
  question(
    "express-service-touch-01",
    "express",
    "악몽에서 깬 새벽",
    "연인이 악몽을 꾸고 놀라 잠에서 깼다. 내가 먼저 하고 싶은 것은?",
    "service",
    "물을 가져오고 조명을 낮게 켜 다시 편히 잘 수 있게 방을 정돈한다.",
    "touch",
    "가까이 끌어안고 호흡이 잦아들 때까지 등을 토닥인다.",
  ),
  question(
    "express-service-touch-02",
    "express",
    "영화를 보다가 추워진 밤",
    "소파에서 영화를 보는데 연인이 자꾸 춥다며 몸을 웅크린다. 나는?",
    "touch",
    "내 품으로 끌어당겨 체온이 느껴지도록 따뜻하게 붙어 앉는다.",
    "service",
    "담요와 따뜻한 차를 가져와 편하게 영화를 볼 수 있게 챙긴다.",
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
