->  Time Complexity: **O(n)**  
->  Space Complexity: **O(1)**  
->  Works for all test cases, including:
- Arrays with duplicates  
- All elements same  
- Negative numbers  
- Small and large arrays  
- Random ordering  

- Logic Summary
We iterate through the array once and track:

- `largest`  
- `second largest`  

But **only unique values** are considered.  
Duplicates of `largest` or `second` are ignored.

At the end:
- If a second largest unique number exists → return it  
- Otherwise → return `-1`
