
import { ApothecaryData } from './types';

export const DATA: ApothecaryData = {
  light: [
    {
      id: 'about',
      name: '关于我：背景与理念',
      icon: '',
      items: [
        { 
          id: 'background', 
          title: '教育背景', 
          description: '清华大学 / 美术学院 / 设计专业。在顶尖艺术学府磨炼出的审美直觉与设计思维。', 
          image: 'https://picsum.photos/seed/tsinghua/600/800', 
          category: 'Background' 
        },
        { 
          id: 'philosophy', 
          title: '设计理念', 
          description: '追求系统逻辑与情感表达的绝对平衡。认为好的系统策划应当是隐形的，却能引导玩家在规则中发现自由。', 
          image: 'https://picsum.photos/seed/philosophy/600/800', 
          category: 'Philosophy' 
        },
        { 
          id: 'expertise', 
          title: '擅长领域', 
          description: '深耕于系统架构设计、数值平衡与交互逻辑。擅长从宏观视角拆解复杂系统，并将其转化为直观的玩家体验。', 
          image: 'https://picsum.photos/seed/expertise/600/800', 
          category: 'Expertise' 
        }
      ]
    },
    {
      id: 'skills',
      name: '技能：工具与语言',
      icon: '',
      items: [
        { 
          id: 'pro-tools', 
          title: '专业技能', 
          description: 'Word, Excel; Unity; Figma, Miro, Xmind; Spine, Blender; PS, AE; Sora, 即梦', 
          image: 'https://picsum.photos/seed/tools/600/800', 
          category: 'Professional' 
        },
        { 
          id: 'coding-skills', 
          title: '其他技能', 
          description: 'Java, C#, Python', 
          image: 'https://picsum.photos/seed/coding/600/800', 
          category: 'Technical' 
        }
      ]
    },
    {
      id: 'projects',
      name: '项目经验：策划与开发',
      icon: '',
      items: [
        { 
          id: 'deconstruct-1', 
          title: '王者荣耀社交拆解', 
          description: '深入分析国民级手游的社交链路与用户留存逻辑。', 
          image: 'https://picsum.photos/seed/hok/600/800', 
          category: '策划拆解案',
          tags: ['系统策划', '社交系统']
        },
        { 
          id: 'deconstruct-2', 
          title: '火影忍者社交拆解', 
          description: '针对动作竞技类手游的社交生态进行解构。', 
          image: 'https://picsum.photos/seed/naruto/600/800', 
          category: '策划拆解案',
          tags: ['系统策划', '社交系统']
        },
        { 
          id: 'jam-1', 
          title: 'Hurry PoPo', 
          description: '现实中谁不想急头白脸的把家里角落的纸巾都翻一遍。', 
          image: 'https://picsum.photos/seed/popo/600/800', 
          category: '游戏比赛 (LD58)',
          tags: ['平台跳跃', '2D', 'PoPo'],
          role: '游戏主策划'
        },
        { 
          id: 'jam-2', 
          title: '污托邦 (Wtopia)', 
          description: '返乡大学生探寻亲人患病真相的过程中，逐步揭开小镇水污染的真正原因。', 
          image: 'https://picsum.photos/seed/wtopia/600/800', 
          category: '游戏比赛 (未来灾害大赛)',
          tags: ['探索', '解谜', '2D'],
          role: '游戏主策划 & UI 设计'
        },
        { 
          id: 'startup', 
          title: 'AI陪伴机器人', 
          description: '探索 AI 技术在情感陪伴领域的应用边界。', 
          image: 'https://picsum.photos/seed/ai/600/800', 
          category: '其他项目 (创业)',
          tags: ['AI', '创业']
        },
        { 
          id: 'practice', 
          title: '种田游戏 (Leuce Island)', 
          description: '实践模拟经营类游戏的系统循环与数值设计。', 
          image: 'https://picsum.photos/seed/leuce/600/800', 
          category: '其他项目 (个人练习)',
          tags: ['模拟经营', '数值设计']
        }
      ]
    },
    {
      id: 'gaming',
      name: '游戏经历：深度体验',
      icon: '',
      items: [
        { 
          id: 'mobile-games', 
          title: '手游', 
          description: '恋与深空（403天、氪金1500+）；代号鸢（1000h+、氪金1000+）；重返未来：1999（100h+、鬃毛邮报1600w伤害）', 
          image: 'https://picsum.photos/seed/mobile/600/800', 
          category: 'Mobile' 
        },
        { 
          id: 'pc-games', 
          title: '端游', 
          description: '泰拉瑞亚（240h）；朝圣者、GOROGOA、谢天谢地你在这、storyteller、绣湖系列、Smaorost2；星露谷（282h、全成就）、桃园深处（氪金1000+）、药剂工艺、蜡笔小新：煤炭镇的小白；空洞骑士（全结局）；丝之歌（全结局）；苏丹的游戏；饥荒、森林；双人成行、双影奇境、Pico Park、超级鸡马、鹅鸭杀、peak、胡闹厨房', 
          image: 'https://picsum.photos/seed/pc/600/800', 
          category: 'PC' 
        }
      ]
    },
    {
      id: 'contact',
      name: '联系方式：建立连接',
      icon: '',
      items: [
        { 
          id: 'main-contact', 
          title: '主要联系方式', 
          description: '电话：15907401207 | 邮箱：1528406657@qq.com', 
          image: 'https://picsum.photos/seed/contact/600/800', 
          category: 'Direct' 
        },
        { 
          id: 'social-media', 
          title: '社交账号', 
          description: '小红书、微信', 
          image: 'https://picsum.photos/seed/social/600/800', 
          category: 'Social' 
        }
      ]
    }
  ],
  dark: [
    {
      id: 'oc-world',
      name: 'OC / 世界观',
      icon: '',
      items: [
        { id: 'vessel', title: '容器原型', description: '关于“我”在不同维度的投射与化身。', image: 'https://picsum.photos/seed/wd1/600/800', category: 'Vessel' },
        { id: 'lore', title: '世界观残卷', description: '碎裂的逻辑，拼凑出一个非欧几里得的梦境。', image: 'https://picsum.photos/seed/wd2/600/800', category: 'Fragment' }
      ]
    },
    {
      id: 'growth-thoughts',
      name: '成长记录 / 思考',
      icon: '',
      items: [
        { id: 'echoes', title: '昨日回响', description: '成长的疼痛与喜悦，被封存在泛黄的瓶子里。', image: 'https://picsum.photos/seed/wd3/600/800', category: 'Echo' },
        { id: 'monologue', title: '深渊独白', description: '在无声的深夜，对存在意义的反复推敲。', image: 'https://picsum.photos/seed/wd4/600/800', category: 'Log' }
      ]
    },
    {
      id: 'creations',
      name: '约稿与私人创作',
      icon: '',
      items: [
        { id: 'commissions', title: '契约之作', description: '为他人绘制的灵魂切片，严谨且附带代价。', image: 'https://picsum.photos/seed/wd5/600/800', category: 'Contract' },
        { id: 'private-art', title: '禁忌秘艺', description: '不被定义的、仅属于个人的危险创作。', image: 'https://picsum.photos/seed/wd6/600/800', category: 'Artifact' }
      ]
    }
  ]
};
