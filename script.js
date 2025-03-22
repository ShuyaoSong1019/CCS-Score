document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取用户输入
    const ggt = parseFloat(document.getElementById('ggt').value);
    const age = parseFloat(document.getElementById('age').value);
    const tc = parseFloat(document.getElementById('tc').value);
    const is_female = parseInt(document.getElementById('is_female').value);
    const ast = parseFloat(document.getElementById('ast').value);
    const has_diabetes = parseInt(document.getElementById('has_diabetes').value);
    const hdl = parseFloat(document.getElementById('hdl').value);
    const bmi = parseFloat(document.getElementById('bmi').value);

    // 计算评分
    const score = final_model_score4(ggt, age, tc, is_female, ast, has_diabetes, hdl, bmi);

    // 显示结果
    document.getElementById('result').innerText = `您的健康评分为: ${score.toFixed(2)}`;
});

function final_model_score4(ggt, age, tc, is_female, ast, has_diabetes, hdl, bmi) {
    const pmax = (x, y) => Math.max(x, y);

    const score = -5.239626 +
        0.10879714 * ggt -
        0.0001017148 * Math.pow(pmax(ggt - 13.4, 0), 3) +
        0.00013169036 * Math.pow(pmax(ggt - 22.3, 0), 3) -
        2.9975555e-05 * Math.pow(pmax(ggt - 52.5, 0), 3) +
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

    return score;
}
