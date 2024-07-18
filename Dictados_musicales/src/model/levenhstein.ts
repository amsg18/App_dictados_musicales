type Operation = 'INSERT' | 'DELETE' | 'SUBSTITUTE' | 'MATCH';
interface Step {
  operation: Operation;
  from?: string;
  to?: string;
}
export class Levenhstein {
  distance(arr1: string[], arr2: string[]): { distance: number, backtrace: Step[] } {
    const n = arr1.length;
    const m = arr2.length;

    // Create a matrix to store distances
    const dp: number[][] = Array.from({length: n + 1}, () => Array(m + 1).fill(0));

    // Initialize the matrix
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;

    // Compute the Levenshtein distance
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const cost = arr1[i - 1] === arr2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,       // Deletion
          dp[i][j - 1] + 1,       // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    // Backtrace to find the operations
    const backtrace: Step[] = [];
    let i = n;
    let j = m;

    while (i > 0 || j > 0) {
      if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        backtrace.push({operation: 'DELETE', from: arr1[i - 1]});
        i--;
      } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
        backtrace.push({operation: 'INSERT', to: arr2[j - 1]});
        j--;
      } else {
        const cost = arr1[i - 1] === arr2[j - 1] ? 0 : 1;
        if (cost === 0) {
          backtrace.push({operation: 'MATCH', from: arr1[i - 1], to: arr2[j - 1]});
        } else {
          backtrace.push({operation: 'SUBSTITUTE', from: arr1[i - 1], to: arr2[j - 1]});
        }
        i--;
        j--;
      }
    }

    backtrace.reverse();
    return {distance: dp[n][m], backtrace};
  }
}
