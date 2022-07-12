export const binomial_calc_info_html = `
  <h4>Formulas</h4><br>
  <p>
    A binomial experiment with <b>n</b> trials, probability of success <b>p</b>, and <b>x</b> successes, has
    <br>Binomial Probability: $$P(X = x) = _nC_x * p^x * (1 - p)^{n - x}$$
    <br>Where "n choose x" is: $$(_nC_x) = \\frac{n!}{x! (n - x)!}$$
    <br>
    <br>Mean: $$ \\mu = n * p$$
    <br>Variance: $$ \\sigma = n * p * (1-p)$$
    <br>Standard Deviation: $$ \\sigma^2 = \\sqrt{n * p * (1-p)}$$
  </p>

  <div class="divider"></div>
  <h4>Requirements</h4><br>

  <p>Binomial Experiments must have:</p>
  <ul>
    <li><b>Trials with 2 outcomes</b> (success or failure)</li>
    <li><b>Independent trials</b> (the probability of a particular outcome is constant)</li>
  </ul>

  <br><p><b>p</b> must be between 0 and 1, <b>n</b> and <b>x</b> must be positive integers where <b>n</b> &ge; <b>x</b></p>

  <div class="divider"></div>

  <p>Learn more on <a class="link" href="https://en.wikipedia.org/wiki/Binomial_distribution" target="_blank">Wikipedia</a>
  and <a class="link" href="https://www.mathsisfun.com/data/binomial-distribution.html" target="_blank">Math is Fun</a>, or watch a <a class="link" href="https://youtu.be/8idr1WZ1A7Q" target="_blank">3Blue1Brown video</a>.</p>
`;
