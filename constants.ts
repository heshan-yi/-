
import { ApothecaryData } from './types';

export const DATA: ApothecaryData = {
  light: [
    {
      id: 'works',
      name: '作品：向外展示',
      icon: '🖼️',
      items: [
        { id: 'proj-a', title: '项目 A', description: '高精度的商业逻辑与艺术视觉的平衡之作。', image: 'https://picsum.photos/seed/wa1/600/800', category: 'Exhibit' },
        { id: 'proj-b', title: '项目 B', description: '关于交互流动的深度探索与技术实践。', image: 'https://picsum.photos/seed/wa2/600/800', category: 'Exhibit' },
        { id: 'exp-concept', title: '实验 / 概念', description: '未定义的边界，纯粹的视觉与逻辑游戏。', image: 'https://picsum.photos/seed/wa3/600/800', category: 'Experimental' }
      ]
    },
    {
      id: 'abilities',
      name: '能力：方法与结构',
      icon: '🧠',
      items: [
        { id: 'skill-tree', title: '技能树', description: '全栈覆盖的技术图谱与艺术审美的交集。', image: 'https://picsum.photos/seed/wa4/600/800', category: 'Attribute' },
        { id: 'workflow', title: '工作流程', description: '从混沌到有序，标准化的高效创作路径。', image: 'https://picsum.photos/seed/wa5/600/800', category: 'System' },
        { id: 'mindset', title: '思维方式', description: '不仅是解决问题，更是解构世界的方式。', image: 'https://picsum.photos/seed/wa6/600/800', category: 'Core' }
      ]
    },
    {
      id: 'hobbies',
      name: '爱好：人格底色',
      icon: '🌿',
      items: [
        { id: 'interests', title: '兴趣领域', description: '构成自我的那些琐碎而热烈的事物。', image: 'https://picsum.photos/seed/wa7/600/800', category: 'Flavor' },
        { id: 'long-term', title: '长期主题', description: '时间河流中，始终坚持的某种叙事。', image: 'https://picsum.photos/seed/wa8/600/800', category: 'Legend' },
        { id: 'inspiration', title: '私人灵感源', description: '那些隐秘的、照亮创作瞬间的光。', image: 'https://picsum.photos/seed/wa9/600/800', category: 'Soul' }
      ]
    }
  ],
  dark: [
    {
      id: 'oc-world',
      name: 'OC / 世界观',
      icon: '🌌',
      items: [
        { id: 'vessel', title: '容器原型', description: '关于“我”在不同维度的投射与化身。', image: 'https://picsum.photos/seed/wd1/600/800', category: 'Vessel' },
        { id: 'lore', title: '世界观残卷', description: '碎裂的逻辑，拼凑出一个非欧几里得的梦境。', image: 'https://picsum.photos/seed/wd2/600/800', category: 'Fragment' }
      ]
    },
    {
      id: 'growth-thoughts',
      name: '成长记录 / 思考',
      icon: '📓',
      items: [
        { id: 'echoes', title: '昨日回响', description: '成长的疼痛与喜悦，被封存在泛黄的瓶子里。', image: 'https://picsum.photos/seed/wd3/600/800', category: 'Echo' },
        { id: 'monologue', title: '深渊独白', description: '在无声的深夜，对存在意义的反复推敲。', image: 'https://picsum.photos/seed/wd4/600/800', category: 'Log' }
      ]
    },
    {
      id: 'creations',
      name: '约稿与私人创作',
      icon: '🗡️',
      items: [
        { id: 'commissions', title: '契约之作', description: '为他人绘制的灵魂切片，严谨且附带代价。', image: 'https://picsum.photos/seed/wd5/600/800', category: 'Contract' },
        { id: 'private-art', title: '禁忌秘艺', description: '不被定义的、仅属于个人的危险创作。', image: 'https://picsum.photos/seed/wd6/600/800', category: 'Artifact' }
      ]
    }
  ]
};
