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
  A: ['𝐀', '𝐴', '𝑨', '𝔸', '𝖠', '𝗔', '𝘈', '𝘼', '𝙰'],
  B: ['𝐁', '𝐵', '𝑩', '𝔹', '𝖡', '𝗕', '𝘉', '𝘽', '𝙱'],
  C: ['ℂ', '𝐂', '𝐶', '𝑪', '𝖢', '𝗖', '𝘊', '𝘾', '𝙲'],
  D: ['ⅅ', '𝐃', '𝐷', '𝑫', '𝔻', '𝖣', '𝗗', '𝘋', '𝘿'],
  E: ['𝙳', '𝐄', '𝐸', '𝑬', '𝔼', '𝖤', '𝗘', '𝘌', '𝙀', '𝙴'],
  F: ['𝐅', '𝐹', '𝑭', '𝔽', '𝖥', '𝗙', '𝘍', '𝙁', '𝙵'],
  G: ['𝐆', '𝐺', '𝑮', '𝔾', '𝖦', '𝗚', '𝘎', '𝙂', '𝙶'],
  H: ['ℍ', '𝐇', '𝐻', '𝑯', '𝖧', '𝗛', '𝘏', '𝙃', '𝙷'],
  I: ['𝐈', '𝐼', '𝑰', '𝕀', '𝖨', '𝗜', '𝘐', '𝙄', '𝙸'],
  J: ['𝐉', '𝐽', '𝑱', '𝕁', '𝖩', '𝗝', '𝘑', '𝙅', '𝙹'],
  K: ['𝐊', '𝐾', '𝑲', '𝕂', '𝖪', '𝗞', '𝘒', '𝙆', '𝙺'],
  L: ['𝐋', '𝐿', '𝑳', '𝕃', '𝖫', '𝗟', '𝘓', '𝙇', '𝙻'],
  M: ['𝐌', '𝑀', '𝑴', '𝕄', '𝖬', '𝗠', '𝘔', '𝙈', '𝙼'],
  N: ['ℕ', '𝐍', '𝑁', '𝑵', '𝖭', '𝗡', '𝘕', '𝙉', '𝙽'],
  O: ['𝐎', '𝑂', '𝑶', '𝕆', '𝖮', '𝗢', '𝘖', '𝙊', '𝙾'],
  P: ['ℙ', '𝐏', '𝑃', '𝑷', '𝖯', '𝗣', '𝘗', '𝙋', '𝙿'],
  Q: ['ℚ', '𝐐', '𝑄', '𝑸', '𝖰', '𝗤', '𝘘', '𝙌', '𝚀'],
  R: ['ℝ', '𝐑', '𝑅', '𝑹', '𝖱', '𝗥', '𝘙', '𝙍', '𝚁'],
  S: ['𝐒', '𝑆', '𝑺', '𝕊', '𝖲', '𝗦', '𝘚', '𝙎', '𝚂'],
  T: ['𝐓', '𝑇', '𝑻', '𝕋', '𝖳', '𝗧', '𝘛', '𝙏', '𝚃'],
  U: ['𝐔', '𝑈', '𝑼', '𝕌', '𝖴', '𝗨', '𝘜', '𝙐', '𝚄'],
  V: ['𝐕', '𝑉', '𝑽', '𝕍', '𝖵', '𝗩', '𝘝', '𝙑', '𝚅'],
  W: ['𝐖', '𝑊', '𝑾', '𝕎', '𝖶', '𝗪', '𝘞', '𝙒', '𝚆'],
  X: ['𝐗', '𝑋', '𝑿', '𝕏', '𝖷', '𝗫', '𝘟', '𝙓', '𝚇'],
  Y: ['𝐘', '𝑌', '𝒀', '𝕐', '𝖸', '𝗬', '𝘠', '𝙔', '𝚈'],
  Z: ['ℤ', '𝐙', '𝑍', '𝒁', '𝖹', '𝗭', '𝘡', '𝙕', '𝚉'],

  a: ['𝛂', '𝛼', '𝜶', '𝝰', '𝞪', '𝐚', '𝑎', '𝒂', '𝕒', '𝖺', '𝗮', '𝘢', '𝙖', '𝚊'],
  b: ['𝛃', '𝛽', '𝜷', '𝝱', '𝞫', '𝐛', '𝑏', '𝒃', '𝕓', '𝖻', '𝗯', '𝘣', '𝙗', '𝚋'],
  c: ['𝐜', '𝑐', '𝒄', '𝔠', '𝕔', '𝖼', '𝗰', '𝘤', '𝙘', '𝚌'],
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
    '𝕕',
    '𝖽',
    '𝗱',
    '𝘥',
    '𝙙',
    '𝚍'
  ],
  e: [
    'ϵ',
    '𝛜',
    '𝜀',
    '𝜖',
    '𝜺',
    '𝝐',
    'ℯ',
    'ⅇ',
    '𝐞',
    '𝑒',
    '𝒆',
    '𝕖',
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
    '𝐟',
    '𝑓',
    '𝒇',
    '𝕗',
    '𝖿',
    '𝗳',
    '𝘧',
    '𝙛',
    '𝚏'
  ],
  g: ['ϑ', '𝛉', '𝜃', '𝑔', '𝒈', '𝔤', '𝕘', '𝖌', '𝗀', '𝗴', '𝘨', '𝙜', '𝚐'],
  h: ['𝛈', '𝜂', '𝜼', '𝝶', '𝞰', 'ℎ', '𝐡', '𝒉', '𝕙', '𝗁', '𝗵', '𝘩', '𝙝', '𝚑'],
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
    '𝔦',
    '𝕚',
    '𝖎',
    '𝗂',
    '𝗶',
    '𝘪',
    '𝚒',
    '𝚤'
  ],
  j: ['ⅉ', '𝐣', '𝑗', '𝒋', '𝔧', '𝕛', '𝖏', '𝗃', '𝗷', '𝘫', '𝙟', '𝚓', '𝚥'],
  k: ['𝐤', '𝑘', '𝒌', '𝕜', '𝗄', '𝗸', '𝘬', '𝙠', '𝚔'],
  l: ['𝐥', '𝑙', '𝒍', '𝔩', '𝕝', '𝗅', '𝗹', '𝘭', '𝙡', '𝚕'],
  m: ['𝐦', '𝑚', '𝒎', '𝕞', '𝖒', '𝗆', '𝗺', '𝘮', '𝙢', '𝚖'],
  n: ['𝐧', '𝑛', '𝕟', '𝗇', '𝗻', '𝘯', '𝙣', '𝚗'],
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
    '𝕠',
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
    '𝕡',
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
    '𝔮',
    '𝕢',
    '𝖖',
    '𝗊',
    '𝗾',
    '𝘲',
    '𝙦',
    '𝚚'
  ],
  r: ['𝐫', '𝑟', '𝒓', '𝕣', '𝗋', '𝗿', '𝘳', '𝙧', '𝚛'],
  s: ['𝐬', '𝑠', '𝒔', '𝕤', '𝗌', '𝘀', '𝘴', '𝙨', '𝚜'],
  t: [
    '𝛕',
    '𝜏',
    '𝝉',
    '𝞃',
    '𝞽',
    '𝐭',
    '𝑡',
    '𝒕',
    '𝔱',
    '𝕥',
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
    '𝔲',
    '𝕦',
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
    '𝐯',
    '𝑣',
    '𝒗',
    '𝕧',
    '𝗏',
    '𝘃',
    '𝘷',
    '𝙫',
    '𝚟'
  ],
  w: ['𝐰', '𝑤', '𝒘', '𝕨', '𝗐', '𝘄', '𝘸', '𝙬', '𝚠'],
  x: [
    '𝛘',
    '𝞆',
    'ϰ',
    '𝛞',
    '𝜘',
    '𝝒',
    '𝝹',
    '𝞌',
    '𝞳',
    '𝟆',
    '𝐱',
    '𝑥',
    '𝒙',
    '𝕩',
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
    '𝕪',
    '𝗒',
    '𝘆',
    '𝘺',
    '𝙮',
    '𝚢'
  ],
  z: ['𝐳', '𝑧', '𝒛', '𝕫', '𝗓', '𝘇', '𝘻', '𝙯', '𝚣']
};

const SUPERSCRIPT = {
  ' ': ' ',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  a: 'ᵃ',
  b: 'ᵇ',
  c: 'ᶜ',
  d: 'ᵈ',
  e: 'ᵉ',
  f: 'ᶠ',
  g: 'ᵍ',
  h: 'ʰ',
  i: 'ⁱ',
  j: 'ʲ',
  k: 'ᵏ',
  l: 'ˡ',
  m: 'ᵐ',
  n: 'ⁿ',
  o: 'ᵒ',
  p: 'ᵖ',
  r: 'ʳ',
  s: 'ˢ',
  t: 'ᵗ',
  u: 'ᵘ',
  v: 'ᵛ',
  w: 'ʷ',
  x: 'ˣ',
  y: 'ʸ',
  z: 'ᶻ'
};

const SUBSCRIPT = {
  ' ': ' ',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '+': '⁺',
  '-': '⁻',
  a: 'ᵃ',
  b: 'ᵇ',
  c: 'ᶜ',
  d: 'ᵈ',
  e: 'ᵉ',
  f: 'ᶠ',
  g: 'ᵍ',
  h: 'ʰ',
  i: 'ⁱ',
  j: 'ʲ',
  k: 'ᵏ',
  l: 'ˡ',
  m: 'ᵐ',
  n: 'ⁿ',
  o: 'ᵒ',
  p: 'ᵖ',
  r: 'ʳ',
  s: 'ˢ',
  t: 'ᵗ',
  u: 'ᵘ',
  v: 'ᵛ',
  w: 'ʷ',
  x: 'ˣ',
  y: 'ʸ',
  z: 'ᶻ'
};

const toSuperscript = (word: string): string =>
  word
    .split('')
    .map(char => {
      const charToLowerCase = char.toLocaleLowerCase();
      return charToLowerCase in SUPERSCRIPT
        ? SUPERSCRIPT[charToLowerCase]
        : char;
    })
    .join('');
