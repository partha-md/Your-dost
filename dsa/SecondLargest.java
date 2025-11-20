import java.util.*;

public class SecondLargest {

    public static int secondLargest(int[] arr) {
        Integer largest = null;
        Integer second = null;

        for (int num : arr) {
            if (largest != null && num == largest) continue;
            if (second != null && num == second) continue;

            if (largest == null || num > largest) {
                second = largest;
                largest = num;
            } else if (num < largest && (second == null || num > second)) {
                second = num;
            }
        }
        return (second == null) ? -1 : second;
    }

    public static void main(String[] args) {

        // Wrapping System.in prevents auto-close of System.in
        try (Scanner sc = new Scanner(System.in)) {

            int n = sc.nextInt();
            int[] arr = new int[n];

            for (int i = 0; i < n; i++) {
                arr[i] = sc.nextInt();
            }

            System.out.println(secondLargest(arr));

        }
    }
}