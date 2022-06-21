const ABC = {
  ArrowLeft: '←',
  ArrowDown: '↓',
  ArrowRight: '→',
  ArrowUp: '↑',
  0: ['0', '𝟎', '𝟘', '𝟢', '𝟬', '𝟶'],
  1: ['1', '𝟏', '𝟙', '𝟣', '𝟭', '𝟷'],
  2: ['2', '𝟐', '𝟚', '𝟤', '𝟮', '𝟸'],
  3: ['3', '𝟑', '𝟛', '𝟥', '𝟯', '𝟹'],
  4: ['4', '𝟒', '𝟜', '𝟦', '𝟰', '𝟺'],
  5: ['5', '𝟓', '𝟝', '𝟧', '𝟱', '𝟻'],
  6: ['6', '𝟔', '𝟞', '𝟨', '𝟲', '𝟼'],
  7: ['7', '𝟕', '𝟟', '𝟩', '𝟳', '𝟽'],
  8: ['8', '𝟖', '𝟠', '𝟪', '𝟴', '𝟾'],
  9: ['9', '𝟗', '𝟡', '𝟫', '𝟵', '𝟿'],
  common: ['∘ ', '⨍', '∞', '∏', '∑', '√', '∛', '∜'],

  other: [
    '∀',
    '∁',
    '∂',
    '∃',
    '∄',
    '∅',
    '∆',
    '∇',
    '∈',
    '∉',
    '∊',
    '∋',
    '∌',
    '∍',
    '∎',
    '∏',
    '∐',
    '∑',
    '≮',
    '≠',
    '≯',
    '∘',
    '∙',
    '√',
    '∛',
    '∜',
    '∝',
    '∞',
    '∟',
    '∠',
    '∡',
    '∢',
    '∤',
    '∥',
    '∦',
    '∧',
    '∨',
    '∩',
    '∪',
    '∫',
    '∬',
    '∭',
    '⨌',
    '∮',
    '∯',
    '∰',
    '∱',
    '∲',
    '∳',
    '∴',
    '∵',
    '∶',
    '∷',
    '∸',
    '∹',
    '∺',
    '∻',
    '∼',
    '≁',
    '∽',
    '∾',
    '∿',
    '≀',
    '≂',
    '≃',
    '≄',
    '≅',
    '≇',
    '≆',
    '≈',
    '≉',
    '≊',
    '≋',
    '≌',
    '≍',
    '≭',
    '≎',
    '≏',
    '≐',
    '≑',
    '≒',
    '≓',
    '≔',
    '≕',
    '≖',
    '≗',
    '≘',
    '≙',
    '≚',
    '≛',
    '≜',
    '≝',
    '≞',
    '≟',
    '≡',
    '≢',
    '≣',
    '≤',
    '≰',
    '≥',
    '≱',
    '≦',
    '≧',
    '≨',
    '≩',
    '≪',
    '≫',
    '≬',
    '≲',
    '≴',
    '≳',
    '≵',
    '≶',
    '≸',
    '≷',
    '≹',
    '≺',
    '⊀',
    '≻',
    '⊁',
    '≼',
    '⋠',
    '≽',
    '⋡',
    '≾',
    '≿',
    '⊂',
    '⊄',
    '⊃',
    '⊅',
    '⊆',
    '⊈',
    '⊇',
    '⊉',
    '⊊',
    '⊋',
    '⊌',
    '⊍',
    '⊎',
    '⊏',
    '⊐',
    '⊑',
    '⋢',
    '⊒',
    '⋣',
    '⊓',
    '⊔',
    '⊕',
    '⊖',
    '⊗',
    '⊘',
    '⊙',
    '⊚',
    '⊛',
    '⊜',
    '⊝',
    '⊞',
    '⊟',
    '⊠',
    '⊡',
    '⊢',
    '⊬',
    '⊣',
    '⊤',
    '⊥',
    '⊦',
    '⊧',
    '⊨',
    '⊭',
    '⊩',
    '⊮',
    '⊪',
    '⊫',
    '⊯',
    '⊰',
    '⊱',
    '⊲',
    '⋪',
    '⊳',
    '⋫',
    '⊴',
    '⋬',
    '⊵',
    '⋭',
    '⊶',
    '⊷',
    '⊸',
    '⊹',
    '⊺',
    '⊻',
    '⊼',
    '⊽',
    '⊾',
    '⊿',
    '⋀',
    '⋁',
    '⋂',
    '⋃',
    '⋄',
    '⋅',
    '⋆',
    '⋇',
    '⋈',
    '⋉',
    '⋊',
    '⋋',
    '⋌',
    '⋍',
    '⋎',
    '⋏',
    '⋐',
    '⋑',
    '⋒',
    '⋓',
    '⋔',
    '⋕',
    '⋖',
    '⋗',
    '⋘',
    '⋙',
    '⋚',
    '⋛',
    '⋜',
    '⋝',
    '⋞',
    '⋟',
    '⋤',
    '⋥',
    '⋦',
    '⋧',
    '⋨',
    '⋩',
    '⋮',
    '⋯',
    '⋰',
    '⋱',
    '⋲',
    '⋳',
    '⋴',
    '⋵',
    '⋶',
    '⋷',
    '⋸',
    '⋹',
    '⋺',
    '⋻',
    '⋼',
    '⋽',
    '⋾',
    '⋿',
    '⨀',
    '⨁',
    '⨂',
    '⨃',
    '⨄',
    '⨅',
    '⨆',
    '⨇',
    '⨈',
    '⨉',
    '⨊',
    '⨋',
    '⨍',
    '⨎',
    '⨏',
    '⨐',
    '⨑',
    '⨒',
    '⨓',
    '⨔',
    '⨕',
    '⨖',
    '⨗',
    '⨘',
    '⨙',
    '⨚',
    '⨛',
    '⨜',
    '｛',
    '｝',
    '⌈',
    '⌉',
    '⌊',
    '⌋',
    '⧼',
    '⧽',
    '⦃',
    '⦄',
    '⦅',
    '⦆',
    '⦇',
    '⦈',
    '⦉',
    '⦊',
    '⦋',
    '⦌',
    '⦍',
    '⦎',
    '⦏',
    '⦐',
    '⦑',
    '⦒',
    '⦓',
    '⦔',
    '⦕',
    '⦖',
    '⦗',
    '⦘',
    '⟅',
    '⟆',
    '⟦',
    '⟧',
    '⟨',
    '⟩',
    '⟪',
    '⟫',
    '⟬',
    '⟭',
    '⟮',
    '⟯',
    '⧘',
    '⧙',
    '⧚',
    '⧛',
    '§',
    '𝚨',
    '𝛢',
    '𝜜',
    '𝝖',
    '𝞐',
    '𝚩',
    '𝛣',
    '𝜝',
    '𝝗',
    '𝞑',
    'ℾ',
    '𝚪',
    '𝛤',
    '𝜞',
    '𝝘',
    '𝞒',
    '𝚫',
    '𝛥',
    '𝜟',
    '𝝙',
    '𝞓',
    '𝚬',
    '𝛦',
    '𝜠',
    '𝝚',
    '𝞔',
    '𝟊',
    '𝚭',
    '𝛧',
    '𝜡',
    '𝝛',
    '𝞕',
    '𝚮',
    '𝛨',
    '𝜢',
    '𝝜',
    '𝞖',
    'ϴ',
    '𝚯',
    '𝚹',
    '𝛩',
    '𝛳',
    '𝜣',
    '𝜭',
    '𝝝',
    '𝝧',
    '𝞗',
    '𝞡',
    '𝚰',
    '𝛪',
    '𝜤',
    '𝝞',
    '𝞘',
    '𝚱',
    '𝛫',
    '𝜥',
    '𝝟',
    '𝞙',
    '𝚲',
    '𝛬',
    '𝜦',
    '𝝠',
    '𝞚',
    '𝚳',
    '𝛭',
    '𝜧',
    '𝝡',
    '𝞛',
    '𝚴',
    '𝛮',
    '𝜨',
    '𝝢',
    '𝞜',
    '𝚵',
    '𝛯',
    '𝜩',
    '𝝣',
    '𝞝',
    '𝚶',
    '𝛰',
    '𝜪',
    '𝝤',
    '𝞞',
    'ℿ',
    '𝚷',
    '𝛱',
    '𝜫',
    '𝝥',
    '𝞟',
    '𝚸',
    '𝛲',
    '𝜬',
    '𝝦',
    '𝞠',
    '𝚺',
    '𝛴',
    '𝜮',
    '𝝨',
    '𝞢',
    '𝚻',
    '𝛵',
    '𝜯',
    '𝝩',
    '𝞣',
    '𝚼',
    '𝛶',
    '𝜰',
    '𝝪',
    '𝞤',
    '𝚽',
    '𝛷',
    '𝜱',
    '𝝫',
    '𝞥',
    '𝚾',
    '𝛸',
    '𝜲',
    '𝝬',
    '𝞦',
    '𝚿',
    '𝛹',
    '𝜳',
    '𝝭',
    '𝞧',
    '𝛀',
    '𝛺',
    '𝜴',
    '𝝮',
    '𝞨'
  ],
  A: ['𝐀', '𝐴', '𝑨', '𝒜', '𝓐', '𝔄', '𝔸', '𝕬', '𝖠', '𝗔', '𝘈', '𝘼', '𝙰'],
  B: ['ℬ', '𝐁', '𝐵', '𝑩', '𝓑', '𝔅', '𝔹', '𝕭', '𝖡', '𝗕', '𝘉', '𝘽', '𝙱'],
  C: ['ℂ', 'ℭ', '𝐂', '𝐶', '𝑪', '𝒞', '𝓒', '𝕮', '𝖢', '𝗖', '𝘊', '𝘾', '𝙲'],
  D: ['ⅅ', '𝐃', '𝐷', '𝑫', '𝒟', '𝓓', '𝔇', '𝔻', '𝕯', '𝖣', '𝗗', '𝘋', '𝘿'],
  E: ['𝙳', 'ℰ', '𝐄', '𝐸', '𝑬', '𝓔', '𝔈', '𝔼', '𝕰', '𝖤', '𝗘', '𝘌', '𝙀', '𝙴'],
  F: ['ℱ', '𝐅', '𝐹', '𝑭', '𝓕', '𝔉', '𝔽', '𝕱', '𝖥', '𝗙', '𝘍', '𝙁', '𝙵'],
  G: ['𝐆', '𝐺', '𝑮', '𝒢', '𝓖', '𝔊', '𝔾', '𝕲', '𝖦', '𝗚', '𝘎', '𝙂', '𝙶'],
  H: ['ℋ', 'ℌ', 'ℍ', '𝐇', '𝐻', '𝑯', '𝓗', '𝕳', '𝖧', '𝗛', '𝘏', '𝙃', '𝙷'],
  I: ['ℐ', 'ℑ', '𝐈', '𝐼', '𝑰', '𝓘', '𝕀', '𝕴', '𝖨', '𝗜', '𝘐', '𝙄', '𝙸'],
  J: ['𝐉', '𝐽', '𝑱', '𝒥', '𝓙', '𝔍', '𝕁', '𝕵', '𝖩', '𝗝', '𝘑', '𝙅', '𝙹'],
  K: ['𝐊', '𝐾', '𝑲', '𝒦', '𝓚', '𝔎', '𝕂', '𝕶', '𝖪', '𝗞', '𝘒', '𝙆', '𝙺'],
  L: ['ℒ', '𝐋', '𝐿', '𝑳', '𝓛', '𝔏', '𝕃', '𝕷', '𝖫', '𝗟', '𝘓', '𝙇', '𝙻'],
  M: ['ℳ', '𝐌', '𝑀', '𝑴', '𝓜', '𝔐', '𝕄', '𝕸', '𝖬', '𝗠', '𝘔', '𝙈', '𝙼'],
  N: ['ℕ', '𝐍', '𝑁', '𝑵', '𝒩', '𝓝', '𝔑', '𝕹', '𝖭', '𝗡', '𝘕', '𝙉', '𝙽'],
  O: ['𝐎', '𝑂', '𝑶', '𝒪', '𝓞', '𝔒', '𝕆', '𝕺', '𝖮', '𝗢', '𝘖', '𝙊', '𝙾'],
  P: ['ℙ', '𝐏', '𝑃', '𝑷', '𝒫', '𝓟', '𝔓', '𝕻', '𝖯', '𝗣', '𝘗', '𝙋', '𝙿'],
  Q: ['ℚ', '𝐐', '𝑄', '𝑸', '𝒬', '𝓠', '𝔔', '𝕼', '𝖰', '𝗤', '𝘘', '𝙌', '𝚀'],
  R: ['ℛ', 'ℜ', 'ℝ', '𝐑', '𝑅', '𝑹', '𝓡', '𝕽', '𝖱', '𝗥', '𝘙', '𝙍', '𝚁'],
  S: ['𝐒', '𝑆', '𝑺', '𝒮', '𝓢', '𝔖', '𝕊', '𝕾', '𝖲', '𝗦', '𝘚', '𝙎', '𝚂'],
  T: ['𝐓', '𝑇', '𝑻', '𝒯', '𝓣', '𝔗', '𝕋', '𝕿', '𝖳', '𝗧', '𝘛', '𝙏', '𝚃'],
  U: ['𝐔', '𝑈', '𝑼', '𝒰', '𝓤', '𝔘', '𝕌', '𝖀', '𝖴', '𝗨', '𝘜', '𝙐', '𝚄'],
  V: ['𝐕', '𝑉', '𝑽', '𝒱', '𝓥', '𝔙', '𝕍', '𝖁', '𝖵', '𝗩', '𝘝', '𝙑', '𝚅'],
  W: ['𝐖', '𝑊', '𝑾', '𝒲', '𝓦', '𝔚', '𝕎', '𝖂', '𝖶', '𝗪', '𝘞', '𝙒', '𝚆'],
  X: ['𝐗', '𝑋', '𝑿', '𝒳', '𝓧', '𝔛', '𝕏', '𝖃', '𝖷', '𝗫', '𝘟', '𝙓', '𝚇'],
  Y: ['𝐘', '𝑌', '𝒀', '𝒴', '𝓨', '𝔜', '𝕐', '𝖄', '𝖸', '𝗬', '𝘠', '𝙔', '𝚈'],
  Z: ['ℤ', 'ℨ', '𝐙', '𝑍', '𝒁', '𝒵', '𝓩', '𝖅', '𝖹', '𝗭', '𝘡', '𝙕', '𝚉'],

  a: [
    '𝛂',
    '𝛼',
    '𝜶',
    '𝝰',
    '𝞪',
    '𝐚',
    '𝑎',
    '𝒂',
    '𝒶',
    '𝓪',
    '𝔞',
    '𝕒',
    '𝖆',
    '𝖺',
    '𝗮',
    '𝘢',
    '𝙖',
    '𝚊'
  ],
  b: [
    '𝛃',
    '𝛽',
    '𝜷',
    '𝝱',
    '𝞫',
    '𝐛',
    '𝑏',
    '𝒃',
    '𝒷',
    '𝓫',
    '𝔟',
    '𝕓',
    '𝖇',
    '𝖻',
    '𝗯',
    '𝘣',
    '𝙗',
    '𝚋'
  ],
  c: [
    'ℽ',
    '𝛄',
    '𝛾',
    '𝜸',
    '𝝲',
    '𝞬',
    '𝐜',
    '𝑐',
    '𝒄',
    '𝒸',
    '𝓬',
    '𝔠',
    '𝕔',
    '𝖈',
    '𝖼',
    '𝗰',
    '𝘤',
    '𝙘',
    '𝚌'
  ],
  d: [
    '𝛅',
    '𝛿',
    '𝜹',
    '𝝳',
    '𝞭',
    'ⅆ',
    '𝐝',
    '𝑑',
    '𝒅',
    '𝒹',
    '𝓭',
    '𝔡',
    '𝕕',
    '𝖉',
    '𝖽',
    '𝗱',
    '𝘥',
    '𝙙',
    '𝚍'
  ],
  e: [
    'ϵ',
    '𝛆',
    '𝛜',
    '𝜀',
    '𝜖',
    '𝜺',
    '𝝐',
    '𝝴',
    '𝞊',
    '𝞮',
    '𝟄',
    '𝟋',
    'ℯ',
    'ⅇ',
    '𝐞',
    '𝑒',
    '𝒆',
    '𝓮',
    '𝔢',
    '𝕖',
    '𝖊',
    '𝖾',
    '𝗲',
    '𝘦',
    '𝙚',
    '𝚎'
  ],
  f: [
    'ϕ',
    '𝛗',
    '𝛟',
    '𝜑',
    '𝜙',
    '𝝋',
    '𝝓',
    '𝞅',
    '𝞍',
    '𝞿',
    '𝟇',
    '𝛓',
    '𝛔',
    '𝜍',
    '𝜎',
    '𝝇',
    '𝝈',
    '𝞁',
    '𝞂',
    '𝞻',
    '𝞼',
    '𝐟',
    '𝑓',
    '𝒇',
    '𝒻',
    '𝓯',
    '𝔣',
    '𝕗',
    '𝖋',
    '𝖿',
    '𝗳',
    '𝘧',
    '𝙛',
    '𝚏'
  ],
  g: [
    '𝛇',
    '𝜁',
    '𝜻',
    '𝝵',
    '𝞯',
    'ϑ',
    '𝛉',
    '𝛝',
    '𝜃',
    '𝜗',
    '𝜽',
    '𝝑',
    '𝝷',
    '𝞋',
    '𝞱',
    '𝟅',
    'ℊ',
    '𝐠',
    '𝑔',
    '𝒈',
    '𝓰',
    '𝔤',
    '𝕘',
    '𝖌',
    '𝗀',
    '𝗴',
    '𝘨',
    '𝙜',
    '𝚐'
  ],
  h: [
    '𝛈',
    '𝜂',
    '𝜼',
    '𝝶',
    '𝞰',
    'ℎ',
    '𝐡',
    '𝒉',
    '𝒽',
    '𝓱',
    '𝔥',
    '𝕙',
    '𝖍',
    '𝗁',
    '𝗵',
    '𝘩',
    '𝙝',
    '𝚑'
  ],
  i: [
    '𝛊',
    '𝜄',
    '𝜾',
    '𝝸',
    '𝞲',
    'ⅈ',
    '𝐢',
    '𝑖',
    '𝒊',
    '𝒾',
    '𝓲',
    '𝔦',
    '𝕚',
    '𝖎',
    '𝗂',
    '𝗶',
    '𝘪',
    '𝙞',
    '𝚒',
    '𝚤'
  ],
  j: [
    'ⅉ',
    '𝐣',
    '𝑗',
    '𝒋',
    '𝒿',
    '𝓳',
    '𝔧',
    '𝕛',
    '𝖏',
    '𝗃',
    '𝗷',
    '𝘫',
    '𝙟',
    '𝚓',
    '𝚥'
  ],
  k: ['𝐤', '𝑘', '𝒌', '𝓀', '𝓴', '𝔨', '𝕜', '𝖐', '𝗄', '𝗸', '𝘬', '𝙠', '𝚔'],
  l: ['𝐥', '𝑙', '𝒍', '𝓁', '𝓵', '𝔩', '𝕝', '𝖑', '𝗅', '𝗹', '𝘭', '𝙡', '𝚕'],
  m: ['𝐦', '𝑚', '𝒎', '𝓂', '𝓶', '𝔪', '𝕞', '𝖒', '𝗆', '𝗺', '𝘮', '𝙢', '𝚖'],
  n: ['𝐧', '𝑛', '𝒏', '𝓃', '𝓷', '𝔫', '𝕟', '𝖓', '𝗇', '𝗻', '𝘯', '𝙣', '𝚗'],
  o: [
    '𝛐',
    '𝜊',
    '𝝄',
    '𝝾',
    '𝞸',
    'ℴ',
    '𝐨',
    '𝑜',
    '𝒐',
    '𝓸',
    '𝔬',
    '𝕠',
    '𝖔',
    '𝗈',
    '𝗼',
    '𝘰',
    '𝙤',
    '𝚘'
  ],
  p: [
    'ℼ',
    '𝛑',
    '𝜋',
    '𝝅',
    '𝝕',
    '𝝿',
    '𝞏',
    '𝞹',
    '𝟉',
    '𝐩',
    '𝑝',
    '𝒑',
    '𝓅',
    '𝓹',
    '𝔭',
    '𝕡',
    '𝖕',
    '𝗉',
    '𝗽',
    '𝘱',
    '𝙥',
    '𝚙'
  ],
  q: [
    'ϱ',
    '𝛒',
    '𝛠',
    '𝜌',
    '𝜚',
    '𝝆',
    '𝝔',
    '𝞀',
    '𝞎',
    '𝞺',
    '𝟈',
    '𝐪',
    '𝑞',
    '𝒒',
    '𝓆',
    '𝓺',
    '𝔮',
    '𝕢',
    '𝖖',
    '𝗊',
    '𝗾',
    '𝘲',
    '𝙦',
    '𝚚'
  ],
  r: ['𝐫', '𝑟', '𝒓', '𝓇', '𝓻', '𝔯', '𝕣', '𝖗', '𝗋', '𝗿', '𝘳', '𝙧', '𝚛'],
  s: ['𝐬', '𝑠', '𝒔', '𝓈', '𝓼', '𝔰', '𝕤', '𝖘', '𝗌', '𝘀', '𝘴', '𝙨', '𝚜'],
  t: [
    '𝛕',
    '𝜏',
    '𝝉',
    '𝞃',
    '𝞽',
    '𝐭',
    '𝑡',
    '𝒕',
    '𝓉',
    '𝓽',
    '𝔱',
    '𝕥',
    '𝖙',
    '𝗍',
    '𝘁',
    '𝘵',
    '𝙩',
    '𝚝'
  ],
  u: [
    '𝛍',
    '𝜇',
    '𝝁',
    '𝝻',
    '𝞵',
    '𝐮',
    '𝑢',
    '𝒖',
    '𝓊',
    '𝓾',
    '𝔲',
    '𝕦',
    '𝖚',
    '𝗎',
    '𝘂',
    '𝘶',
    '𝙪',
    '𝚞'
  ],
  v: [
    '𝛖',
    '𝜐',
    '𝝊',
    '𝞄',
    '𝞾',
    '𝛎',
    '𝜈',
    '𝝂',
    '𝝼',
    '𝞶',
    '𝐯',
    '𝑣',
    '𝒗',
    '𝓋',
    '𝓿',
    '𝔳',
    '𝕧',
    '𝖛',
    '𝗏',
    '𝘃',
    '𝘷',
    '𝙫',
    '𝚟'
  ],
  w: ['𝐰', '𝑤', '𝒘', '𝓌', '𝔀', '𝔴', '𝕨', '𝖜', '𝗐', '𝘄', '𝘸', '𝙬', '𝚠'],
  x: [
    '𝛘',
    '𝜒',
    '𝝌',
    '𝞆',
    '𝟀',
    ,
    'ϰ',
    '𝛋',
    '𝛞',
    '𝜅',
    '𝜘',
    '𝜿',
    '𝝒',
    '𝝹',
    '𝞌',
    '𝞳',
    '𝟆',
    '𝐱',
    '𝑥',
    '𝒙',
    '𝓍',
    '𝔁',
    '𝔵',
    '𝕩',
    '𝖝',
    '𝗑',
    '𝘅',
    '𝘹',
    '𝙭',
    '𝚡'
  ],
  y: [
    '𝛙',
    '𝜓',
    '𝝍',
    '𝛌',
    '𝜆',
    '𝝀',
    '𝝺',
    '𝞴',
    '𝐲',
    '𝑦',
    '𝒚',
    '𝓎',
    '𝔂',
    '𝔶',
    '𝕪',
    '𝖞',
    '𝗒',
    '𝘆',
    '𝘺',
    '𝙮',
    '𝚢'
  ],
  z: [
    '𝛏',
    '𝜉',
    '𝝃',
    '𝝽',
    '𝞷',
    '𝐳',
    '𝑧',
    '𝒛',
    '𝓏',
    '𝔃',
    '𝔷',
    '𝕫',
    '𝖟',
    '𝗓',
    '𝘇',
    '𝘻',
    '𝙯',
    '𝚣'
  ]
};
