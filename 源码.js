
    const overList = [];
    const problemElement = document.querySelector('.problem');
    const answerElement = document.querySelector('.answer input');
    const submitElement = document.querySelector('.submit button');
    const infoElement = document.querySelector('.info');
    let problem;
    let successNumber = 0;
    let errorNumber = 0;

    // 挣值模型 [名称, 代码, 公式]
    const modelList = [
      ['成本偏差', 'CV', 'EV-AC'],
      ['成本绩效指数', 'CPI', 'EV/AC'],
      ['进度偏差', 'SV', 'EV-PV'],
      ['进度绩效指数', 'SPI', 'EV/PV'],
      ['完工估算', 'EAC', 'EAC/CPI'],
      ['完工尚需估算', 'ETC', 'EAC-AC'],
      ['完工剩余绩效指数', 'TCPI', '(BAC-EV)/[BAC(EAC)-AC]'],
      ['完工成本偏差', 'VAC', 'BAC-EAC'],
      ['估算完工工期', 'EDAC', 'BDAC/SPI'],
    ];

    // 生成一个题目
    function getRandomProblem(model) {
      const [name, value, formula] = model;
      const list = [
        [`${name}如何表示?(例：CV)`, [value]],
        [`${name}公式?(例：EV-AC)`, [formula, `${value}=${formula}`]],
        [`${value}指?(例：成本偏差)`, [name]],
        [`${value}公式?(例：CV=EV-AC)`, [formula, `${value}=${formula}`]],
        [`${formula}计算的是?(例：成本偏差)`, [name, value]],
      ]

      return list[parseInt(Math.random() * list.length, 10)];
    }

    // 为页面生成一个问题
    function generateProblem() {
      answerElement.value = '';
      infoElement.innerHTML = '';
      const length = modelList.length;

      // 一轮结束, 自动下一轮
      if (length === 0) {
        modelList.push.apply(modelList, overList.splice(0));
      }

      const index = parseInt(Math.random() * length, 10);
      const model = modelList.splice(index, 1);
      overList.push.apply(overList, model);
      problem = getRandomProblem(...model);

      problemElement.innerHTML = problem[0];
    }

    // 提交问题
    submitElement.addEventListener('click', () => {
      // 答案转为大写方便匹配
      const submitValue = answerElement.value.toUpperCase();
      if (problem[1].includes(submitValue)) {
        // 答对
        infoElement.innerHTML = '正确! 进入下一题';
        setTimeout(generateProblem, 2000);
        successNumber ++;
      } else {
        // 答错
        infoElement.innerHTML = `错误, 答案是<span style="color: red;">${problem[1][0]}</span>, 5秒后自动进入下一题`;
        setTimeout(generateProblem, 5000);
        errorNumber ++;
      }

      console.log('答对', successNumber, '题, 答错', errorNumber, '题!');
    });

    // 输入框回车也相当于提交
    answerElement.addEventListener('keydown', (event) => {
      event.keyCode === 13 && submitElement.click();
    });

    // 开始答题！
    generateProblem();