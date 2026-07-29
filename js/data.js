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
    "힘든 하루",
    "야근을 마치고 밤 10시에 집에 왔다. 오늘 하루가 너무 길었다고 말했을 때, 더 마음이 놓이는 쪽은?",
    "words",
    "연인이 내가 버틴 일을 하나씩 짚으며 “오늘 정말 애썼어”라고 말해준다.",
    "time",
    "연인이 휴대폰을 뒤집어 놓고 30분 동안 오늘 있었던 일을 온전히 들어준다.",
  ),
  question(
    "receive-words-time-02",
    "receive",
    "기쁜 소식",
    "몇 달 준비한 시험에 합격했다. 그날 저녁, 더 사랑받는다고 느끼는 축하는?",
    "words",
    "연인이 내가 얼마나 성장했는지 구체적으로 말하며 진심으로 자랑스러워한다.",
    "time",
    "연인이 다른 일정을 비우고 둘만의 합격 축하 저녁을 보낸다.",
  ),
  question(
    "receive-gifts-words-01",
    "receive",
    "첫 출근",
    "새 직장의 첫 출근 아침이다. 긴장한 나를 더 미소 짓게 하는 것은?",
    "words",
    "연인이 내가 이 일에 잘 맞는 이유를 담은 응원 음성 메시지를 보내준다.",
    "gifts",
    "연인이 전에 예쁘다고 했던 작은 키링을 출근 가방에 달아준다.",
  ),
  question(
    "receive-gifts-words-02",
    "receive",
    "평범한 화요일",
    "별일 없는 화요일 오후, 예상하지 못한 순간에 더 오래 기억에 남는 것은?",
    "words",
    "연인이 요즘 고마웠던 내 행동을 구체적으로 적어 메시지로 보내준다.",
    "gifts",
    "연인이 지나가다 나를 떠올렸다며 좋아하는 작은 간식을 건네준다.",
  ),
  question(
    "receive-service-words-01",
    "receive",
    "마감 전날",
    "내일 중요한 발표인데 자료가 아직 끝나지 않았다. 연인이 한 가지만 해준다면?",
    "service",
    "막힌 부분을 물어보고 표와 오탈자 정리를 함께 끝내준다.",
    "words",
    "내가 준비해온 과정을 구체적으로 짚으며 충분히 해낼 수 있다고 말해준다.",
  ),
  question(
    "receive-service-words-02",
    "receive",
    "자신감이 떨어진 날",
    "면접에서 떨어져서 내가 별로인 사람처럼 느껴진다. 더 힘이 되는 쪽은?",
    "words",
    "결과와 상관없이 내 장점이 무엇인지 구체적인 사례로 말해준다.",
    "service",
    "다음 지원 일정을 정리하고 이력서의 헷갈리는 부분을 함께 점검해준다.",
  ),
  question(
    "receive-touch-words-01",
    "receive",
    "큰 실수",
    "회사에서 큰 실수를 하고 집에 돌아왔다. 현관에서 더 위로되는 반응은?",
    "words",
    "연인이 “실수 하나가 너의 전부는 아니야”라고 차분히 말해준다.",
    "touch",
    "연인이 먼저 괜찮은지 묻고, 내가 원하자 한동안 꼭 안아준다.",
  ),
  question(
    "receive-touch-words-02",
    "receive",
    "중요한 순간 직전",
    "잠시 뒤 무대에 올라가야 해서 손이 떨린다. 연인이 옆에 있다면?",
    "touch",
    "내가 괜찮다고 할 때까지 두 손을 감싸 잡아준다.",
    "words",
    "내가 잘했던 연습 장면을 떠올려주며 짧고 분명하게 응원한다.",
  ),
  question(
    "receive-gifts-time-01",
    "receive",
    "1주년",
    "연애 1주년, 둘 중 하나만 준비할 수 있다면 더 기대되는 것은?",
    "time",
    "첫 데이트 장소를 다시 걸으며 휴대폰 없이 저녁을 함께 보낸다.",
    "gifts",
    "몇 달 전 갖고 싶다고 지나가듯 말한 물건을 기억해 준비한다.",
  ),
  question(
    "receive-gifts-time-02",
    "receive",
    "여행 후 재회",
    "연인이 일주일 출장을 마치고 돌아왔다. 더 반가운 환영 방식은?",
    "gifts",
    "출장지에서 내 취향을 떠올려 고른 작은 기념품을 건넨다.",
    "time",
    "짐을 내려놓고 그날 저녁을 비워 서로의 일주일을 천천히 나눈다.",
  ),
  question(
    "receive-service-time-01",
    "receive",
    "아픈 주말",
    "감기로 하루 종일 누워 있는 토요일이다. 더 보살핌받는다고 느끼는 쪽은?",
    "service",
    "연인이 약과 죽을 챙기고 밀린 설거지까지 조용히 해준다.",
    "time",
    "연인이 일정을 비우고 내 옆에서 함께 영화를 보며 쉬어준다.",
  ),
  question(
    "receive-service-time-02",
    "receive",
    "번아웃",
    "일이 몰려 아무것도 하기 싫은 일요일 저녁이다. 더 필요한 것은?",
    "time",
    "연인이 산책을 제안하고 내 속도에 맞춰 한 시간 같이 걷는다.",
    "service",
    "연인이 다음 주에 필요한 장보기와 식사 준비를 대신 끝내준다.",
  ),
  question(
    "receive-time-touch-01",
    "receive",
    "오랜만의 재회",
    "서로 바빠 열흘 만에 만났다. 카페에 앉자마자 더 먼저 원하는 것은?",
    "time",
    "서로의 얼굴을 보며 그동안 있었던 일을 끊김 없이 이야기한다.",
    "touch",
    "괜찮은지 확인한 뒤 오래 안고 나란히 손을 잡고 앉는다.",
  ),
  question(
    "receive-time-touch-02",
    "receive",
    "잠들기 전",
    "유난히 마음이 복잡한 밤이다. 잠들기 전 더 안정되는 순간은?",
    "touch",
    "연인이 내가 원하자 말없이 등을 토닥이며 곁에 있어준다.",
    "time",
    "연인이 조명을 낮추고 걱정되는 일을 끝까지 함께 이야기한다.",
  ),
  question(
    "receive-gifts-service-01",
    "receive",
    "새로운 취미",
    "내가 처음으로 베이킹을 시작했다. 연인의 어떤 응원이 더 와닿는가?",
    "gifts",
    "내가 찾아보던 기본 도구를 취향에 맞춰 하나 골라준다.",
    "service",
    "복잡한 재료 계량과 뒷정리를 맡아 첫 베이킹을 편하게 도와준다.",
  ),
  question(
    "receive-gifts-service-02",
    "receive",
    "이사 첫날",
    "새집으로 이사한 첫날 밤, 연인이 한 가지만 해줄 수 있다면?",
    "service",
    "침구와 주방처럼 오늘 꼭 필요한 상자를 찾아 정리해준다.",
    "gifts",
    "새집 분위기와 내 취향에 맞는 작은 조명을 골라 선물한다.",
  ),
  question(
    "receive-gifts-touch-01",
    "receive",
    "공항 마중",
    "한 달 만에 공항에서 다시 만났다. 가장 먼저 마음이 차오르는 순간은?",
    "touch",
    "연인이 괜찮은지 묻고 사람들 사이에서 나를 오래 안아준다.",
    "gifts",
    "연인이 기다리는 동안 고른 꽃 한 송이와 작은 메모 카드를 건넨다.",
  ),
  question(
    "receive-gifts-touch-02",
    "receive",
    "생일의 마지막",
    "생일 하루가 끝나갈 때, 더 따뜻하게 기억될 장면은?",
    "gifts",
    "연인이 우리에게 의미 있는 사진을 작은 액자에 담아준다.",
    "touch",
    "연인이 괜찮은지 확인하고 소파에서 꼭 안은 채 하루를 마무리한다.",
  ),
  question(
    "receive-service-touch-01",
    "receive",
    "두통이 심한 날",
    "머리가 아파서 아무것도 하기 힘들다. 더 즉각적으로 안심되는 것은?",
    "service",
    "연인이 조명을 낮추고 물과 약, 조용한 환경을 마련해준다.",
    "touch",
    "연인이 원하는지 묻고 손을 잡거나 관자놀이를 부드럽게 눌러준다.",
  ),
  question(
    "receive-service-touch-02",
    "receive",
    "울고 난 뒤",
    "속상한 일을 털어놓다 한참 울었다. 진정된 뒤 더 필요한 것은?",
    "touch",
    "연인이 허락을 구하고 내 옆에 붙어 앉아 등을 천천히 쓸어준다.",
    "service",
    "연인이 따뜻한 물을 가져오고 내일 부담되는 일 하나를 대신 처리해준다.",
  ),
];

const EXPRESS_QUESTIONS = [
  question(
    "express-words-time-01",
    "express",
    "힘든 하루",
    "연인이 야근을 마치고 지친 얼굴로 돌아왔다. 내가 더 먼저 하고 싶은 행동은?",
    "words",
    "오늘 버틴 일을 구체적으로 짚으며 정말 애썼다고 말한다.",
    "time",
    "휴대폰을 뒤집어 놓고 오늘 무슨 일이 있었는지 천천히 듣는다.",
  ),
  question(
    "express-words-time-02",
    "express",
    "큰 성취",
    "연인이 오래 준비한 자격시험에 합격했다. 나다운 축하 방식은?",
    "time",
    "다른 일정을 비우고 둘만의 합격 축하 저녁을 준비한다.",
    "words",
    "그동안의 성장과 대단했던 점을 구체적으로 말해준다.",
  ),
  question(
    "express-gifts-words-01",
    "express",
    "첫 출근",
    "내일은 연인의 새 직장 첫 출근이다. 내가 자연스럽게 준비할 것은?",
    "words",
    "잘할 수밖에 없는 이유를 담아 짧은 음성 메시지를 보낸다.",
    "gifts",
    "연인이 예쁘다고 했던 작은 키링을 출근 가방에 달아준다.",
  ),
  question(
    "express-gifts-words-02",
    "express",
    "평범한 화요일",
    "특별한 일 없는 오후, 문득 연인이 떠올랐다. 나는?",
    "gifts",
    "지나가다 연인이 좋아하는 간식을 발견해 하나 사간다.",
    "words",
    "요즘 고마웠던 행동을 구체적으로 적어 메시지를 보낸다.",
  ),
  question(
    "express-service-words-01",
    "express",
    "마감 전날",
    "연인이 내일 중요한 발표인데 자료를 아직 끝내지 못했다. 나는?",
    "service",
    "어디가 막혔는지 물어보고 표와 오탈자 정리를 함께한다.",
    "words",
    "준비해온 과정을 짚어주며 충분히 해낼 수 있다고 응원한다.",
  ),
  question(
    "express-service-words-02",
    "express",
    "자신감이 떨어진 날",
    "연인이 면접에서 떨어지고 자신감을 잃었다. 내가 먼저 할 일은?",
    "words",
    "연인의 장점을 실제로 보았던 순간을 구체적으로 들려준다.",
    "service",
    "다음 지원 일정을 정리하고 이력서의 어려운 부분을 함께 점검한다.",
  ),
  question(
    "express-touch-words-01",
    "express",
    "큰 실수",
    "연인이 회사에서 큰 실수를 하고 집에 돌아왔다. 나는 현관에서?",
    "touch",
    "괜찮은지 묻고 원한다면 한동안 꼭 안아준다.",
    "words",
    "실수 하나가 연인의 전부는 아니라고 차분하게 말해준다.",
  ),
  question(
    "express-touch-words-02",
    "express",
    "중요한 순간 직전",
    "잠시 뒤 무대에 설 연인의 손이 떨리고 있다. 나는?",
    "words",
    "잘했던 연습 장면을 떠올려주며 짧고 분명하게 응원한다.",
    "touch",
    "괜찮은지 확인하고 두 손을 감싸 잡아준다.",
  ),
  question(
    "express-gifts-time-01",
    "express",
    "1주년",
    "연애 1주년, 하나만 준비할 수 있다면 나는?",
    "time",
    "첫 데이트 장소를 다시 걷는 둘만의 저녁 계획을 짠다.",
    "gifts",
    "연인이 몇 달 전 갖고 싶다고 말한 물건을 찾아 준비한다.",
  ),
  question(
    "express-gifts-time-02",
    "express",
    "출장 후 재회",
    "일주일 출장을 마치고 연인을 만나러 간다. 나는?",
    "gifts",
    "출장지에서 연인 취향을 떠올려 고른 작은 기념품을 건넨다.",
    "time",
    "그날 저녁을 비워 서로의 일주일을 천천히 나눈다.",
  ),
  question(
    "express-service-time-01",
    "express",
    "아픈 주말",
    "연인이 감기로 하루 종일 누워 있다. 내가 더 먼저 하는 일은?",
    "service",
    "약과 죽을 챙기고 밀린 설거지를 조용히 해둔다.",
    "time",
    "일정을 비우고 옆에서 같이 영화를 보며 쉬어준다.",
  ),
  question(
    "express-service-time-02",
    "express",
    "번아웃",
    "연인이 일이 몰려 아무것도 하기 싫다고 한다. 나는?",
    "time",
    "연인의 속도에 맞춰 한 시간 산책하며 이야기를 듣는다.",
    "service",
    "다음 주에 필요한 장보기와 식사 준비를 대신 끝낸다.",
  ),
  question(
    "express-time-touch-01",
    "express",
    "오랜만의 재회",
    "서로 바빠 열흘 만에 연인을 만났다. 내가 더 먼저 하고 싶은 것은?",
    "touch",
    "괜찮은지 확인하고 오래 안은 뒤 손을 잡고 앉는다.",
    "time",
    "서로의 얼굴을 보며 그동안 있었던 일을 끊김 없이 나눈다.",
  ),
  question(
    "express-time-touch-02",
    "express",
    "잠들기 전",
    "연인이 마음이 복잡해 잠들기 어렵다고 한다. 나는?",
    "time",
    "조명을 낮추고 걱정되는 일을 끝까지 함께 이야기한다.",
    "touch",
    "원하는지 묻고 등을 토닥이며 조용히 곁에 있어준다.",
  ),
  question(
    "express-gifts-service-01",
    "express",
    "새로운 취미",
    "연인이 처음으로 베이킹을 시작했다. 내가 하고 싶은 응원은?",
    "gifts",
    "연인이 찾아보던 기본 도구를 취향에 맞춰 하나 골라준다.",
    "service",
    "복잡한 재료 계량과 뒷정리를 맡아 첫 시도를 도와준다.",
  ),
  question(
    "express-gifts-service-02",
    "express",
    "이사 첫날",
    "연인이 새집으로 이사한 첫날, 한 가지만 돕는다면?",
    "service",
    "침구와 주방처럼 오늘 꼭 필요한 상자를 찾아 정리한다.",
    "gifts",
    "새집 분위기와 연인 취향에 맞는 작은 조명을 골라준다.",
  ),
  question(
    "express-gifts-touch-01",
    "express",
    "공항 마중",
    "한 달 만에 공항에서 연인을 다시 만난다. 나는?",
    "touch",
    "괜찮은지 묻고 사람들 사이에서 연인을 오래 안아준다.",
    "gifts",
    "기다리는 동안 고른 꽃 한 송이와 작은 메모 카드를 건넨다.",
  ),
  question(
    "express-gifts-touch-02",
    "express",
    "생일의 마지막",
    "연인의 생일이 끝나갈 때, 내가 남기고 싶은 장면은?",
    "gifts",
    "우리에게 의미 있는 사진을 작은 액자에 담아 건넨다.",
    "touch",
    "괜찮은지 확인하고 소파에서 꼭 안은 채 하루를 마무리한다.",
  ),
  question(
    "express-service-touch-01",
    "express",
    "두통이 심한 날",
    "연인이 머리가 아파 아무것도 하기 힘들어한다. 나는?",
    "service",
    "조명을 낮추고 물과 약, 조용한 환경을 마련한다.",
    "touch",
    "원하는지 묻고 손을 잡거나 관자놀이를 부드럽게 눌러준다.",
  ),
  question(
    "express-service-touch-02",
    "express",
    "울고 난 뒤",
    "연인이 속상한 일을 털어놓다 한참 울었다. 진정된 뒤 나는?",
    "touch",
    "허락을 구하고 옆에 붙어 앉아 등을 천천히 쓸어준다.",
    "service",
    "따뜻한 물을 가져오고 내일 부담되는 일 하나를 대신 처리한다.",
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

  for (const item of questions) {
    if (ids.has(item.id)) errors.push(`Duplicate question id: ${item.id}`);
    ids.add(item.id);

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

