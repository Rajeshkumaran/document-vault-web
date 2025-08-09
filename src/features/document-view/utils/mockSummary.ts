export const mockSummary = `
# Design and Build Accessible PDF Tables - Sample Tables

**TL;DR:** A comprehensive reference document demonstrating various table structures and accessibility best practices for PDF documents, featuring 29 sample tables with examples of proper formatting, common problems, and solutions.

## Key Points

• **Table Structure Examples**: Demonstrates proper use of column headers (TH) and data cells (TD) for accessibility
• **Financial Data Formatting**: Multiple examples of year-end statements, expenditure tables, and financial reporting formats
• **Common Problems Addressed**: 
  - Merged data cells (not recommended)
  - Missing column headers
  - Poor heading structure
  - Use of graphic symbols instead of text
• **Best Practices Illustrated**:
  - Self-contained tables with clear categorization
  - Proper footnote referencing and placement
  - Replacement of symbols with descriptive text
  - Appropriate use of parentheses for negative values
• **Data Categories Covered**: Financial statements, rainfall data, course offerings, survey responses, and human development indices
• **Accessibility Focus**: Emphasizes proper table tagging, scope attributes, and structural elements for screen readers

## Sample Financial Data

| Year | Non-current Assets (£k) | Current Assets (£k) | Current Liabilities (£k) |
|------|------------------------|-------------------|------------------------|
| 2010 | Buildings: 345, Investment: 567, Intangibles: 423 | Trade: 435, Cash: 524, Other: 223 | Trade liabilities: 154, Financial debt: 231, Provisions: 111 |
| 2009 | Buildings: 445, Investment: 654, Intangibles: 123 | Trade: 634, Cash: 123, Other: 211 | Trade liabilities: 125, Financial debt: 474, Provisions: 312 |
| 2008 | Buildings: 222, Investment: 423, Intangibles: 453 | Trade: 231, Cash: 482, Other: 254 | Trade liabilities: 421, Financial debt: 572, Provisions: 347 |

## Action Items

• **For PDF Creators**: Implement proper table tagging with TH and TD elements
• **For Accessibility**: Replace graphic symbols with descriptive text
• **For Financial Reporting**: Use consistent formatting with clear categorization and appropriate negative value notation
• **For Complex Tables**: Avoid merged cells and ensure each data cell has clear header associations
• **For Documentation**: Include explanatory notes and footnotes where necessary for data clarity
`;
