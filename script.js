// 多语言配置
const i18n = {
    en: {
        title: "Liver Cirrhosis Risk Calculator",
        subtitle: "Clinical Prediction Model",
        ggt: "GGT (U/L)",
        age: "Age",
        tc: "Total Cholesterol (mg/dL)",
        gender: "Gender",
        male: "Male",
        female: "Female",
        ast: "AST (U/L)",
        diabetes: "Diabetes",
        yes: "Yes",
        no: "No",
        hdl: "HDL (mg/dL)",
        bmi: "BMI",
        calculate: "Calculate Risk",
        result_title: "Your Risk Probability",
        low_risk: "Low Risk",
        medium_risk: "Medium Risk",
        high_risk: "High Risk",
        enter_ggt: "Enter GGT value",
        disclaimer_title: "Important Notice",
        disclaimer_1: "This tool provides risk estimates based on statistical models and should not replace professional medical advice.",
        disclaimer_2: "Calculation results may vary with individual health conditions and laboratory methods.",
        disclaimer_3: "We do not store any user input data."
    },
    zh: {
        title: "肝硬化风险计算器",
        subtitle: "临床预测模型",
        ggt: "谷氨酰转肽酶GGT (U/L)",
        age: "年龄",
        tc: "总胆固醇TC (mg/dL)",
        gender: "性别",
        male: "男性",
        female: "女性",
        ast: "谷草转氨酶AST (U/L)",
        diabetes: "糖尿病史",
        yes: "有",
        no: "无",
        hdl: "高密度脂蛋白HDL (mg/dL)",
        bmi: "身体质量指数BMI",
        calculate: "计算风险",
        result_title: "您的风险概率",
        low_risk: "低风险",
        medium_risk: "中风险",
        high_risk: "高风险",
        enter_ggt: "请输入GGT值",
        disclaimer_title: "重要声明",
        disclaimer_1: "本工具基于统计学模型提供风险评估，不能替代专业医疗诊断",
        disclaimer_2: "计算结果可能因个体健康状况和检测方法不同存在差异",
        disclaimer_3: "我们不会存储任何用户输入数据"
    }
};

// 语言切换功能
function changeLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18n[lang][key];
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = i18n[lang][key];
    });
}

// 初始化为英文
changeLanguage('en');

// 更新后的计算公式
function calculateRisk(ggt, age, tc, is_female, ast, has_diabetes, hdl, bmi) {
    const pmax = (x, y) => Math.max(x, y);
    
    const score = -5.239626 +
        0.10879714 * ggt -
        0.0001017148 * Math.pow(pmax(ggt - 13.4, 0), 3) +
        0.00013169036 * Math.pow(pmax(ggt - 22.3, 0), 3) -
        2.9975555e-5 * Math.pow(pmax(ggt - 52.5, 0), 3) +
        0.046680734 * age -
        0.1056094 * tc -
        5.6458036 * is_female +
        0.013602785 * ast +
        0.46411484 * has_diabetes -
        0.40231523 * hdl -
        0.16098654 * bmi +
        0.0026687438 * Math.pow(pmax(bmi - 20.200001, 0), 3) -
        0.0049893916 * Math.pow(pmax(bmi - 24.200001, 0), 3) +
        0.0023206478 * Math.pow(pmax(bmi - 28.799999, 0), 3) +
        is_female * (0.26032348 * bmi -
            0.0031969233 * Math.pow(pmax(bmi - 20.200001, 0), 3) +
            0.0059768578 * Math.pow(pmax(bmi - 24.200001, 0), 3) -
            0.0027799345 * Math.pow(pmax(bmi - 28.799999, 0), 3));

    // 应用logistic函数转换
    const probability = 1 / (1 + Math.exp(-score));
    return probability;
}

// 表单提交处理
document.getElementById('health-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = {
        ggt: parseFloat(document.getElementById('ggt').value),
        age: parseFloat(document.getElementById('age').value),
        tc: parseFloat(document.getElementById('tc').value),
        is_female: parseInt(document.getElementById('is_female').value),
        ast: parseFloat(document.getElementById('ast').value),
        has_diabetes: parseInt(document.getElementById('has_diabetes').value),
        hdl: parseFloat(document.getElementById('hdl').value),
        bmi: parseFloat(document.getElementById('bmi').value)
    };

    const risk = calculateRisk(...Object.values(inputs));
    const riskPercent = (risk * 100).toFixed(1);
    
    // 更新结果显示
    document.getElementById('result').textContent = `${riskPercent}%`;
    
    // 更新风险等级颜色
    document.querySelectorAll('.risk-level').forEach(el => el.style.opacity = 0.3);
    if (risk < 0.02) {
        document.querySelector('.low').style.opacity = 1;
    } else if (risk < 0.1) {
        document.querySelector('.medium').style.opacity = 1;
    } else {
        document.querySelector('.high').style.opacity = 1;
    }
});
