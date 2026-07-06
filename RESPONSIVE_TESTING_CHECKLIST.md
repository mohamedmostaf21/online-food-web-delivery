# Responsive Design Testing Checklist

Use this checklist to verify responsiveness across all breakpoints and components.

## Viewport Sizes to Test

- [ ] 320px (Small phone)
- [ ] 375px (iPhone)
- [ ] 480px (Landscape phone)
- [ ] 640px (Mobile XL)
- [ ] 768px (Tablet portrait)
- [ ] 800px (Tablet landscape)
- [ ] 1024px (Tablet large / Desktop small)
- [ ] 1440px (Desktop)
- [ ] 1920px (Large desktop)

## Page-Specific Tests

### Home Page
- [ ] Hero section displays correctly on all sizes
- [ ] Hero title scales appropriately
- [ ] Hero buttons stack vertically on mobile
- [ ] "Popular dishes" grid: 3 cols → 2 cols → 1 col
- [ ] Stats section responsive
- [ ] Feature cards responsive
- [ ] Footer readable on mobile

### Menu Page
- [ ] Product grid responsive (3 → 2 → 1 columns)
- [ ] Category buttons wrap properly
- [ ] Product cards don't overflow
- [ ] Images display at correct sizes
- [ ] Prep time badge visible on all sizes
- [ ] Add to cart button accessible

### Cart Page
- [ ] Cart items display properly
- [ ] Summary section responsive
- [ ] Checkout form fields full width on mobile
- [ ] Total price visible on all sizes
- [ ] Address options readable
- [ ] Checkout button accessible
- [ ] Empty cart message centered

### Orders Page
- [ ] Order list responsive
- [ ] Order cards don't break layout
- [ ] Order details grid responsive
- [ ] Status badges visible
- [ ] Order info readable on mobile
- [ ] Timestamps display properly

### Admin Dashboard
- [ ] Stats grid: 4 → 2 → 1 columns
- [ ] Tabs responsive
- [ ] Tables scrollable on mobile
- [ ] Forms responsive
- [ ] Buttons accessible
- [ ] Navigation menu collapses

### Authentication Pages
- [ ] Auth card responsive width
- [ ] Form inputs full width on mobile
- [ ] Labels readable
- [ ] Error messages display
- [ ] Buttons accessible
- [ ] Links clickable on touch devices

### Navigation
- [ ] Navbar doesn't overflow on any size
- [ ] Logo readable on mobile
- [ ] Menu items accessible
- [ ] Hamburger menu appears on mobile
- [ ] Language switcher accessible
- [ ] User menu accessible
- [ ] Cart icon always visible

## Component-Specific Tests

### Typography
- [ ] Text readable on 320px viewport (no horizontal scroll)
- [ ] Font sizes scale appropriately
- [ ] Line height maintains readability
- [ ] Headings don't overflow
- [ ] Links are understandable

### Buttons
- [ ] Minimum 44x44px touch targets
- [ ] Proper padding on all sizes
- [ ] Readable text
- [ ] Color contrast maintained
- [ ] Hover states work on touch

### Forms
- [ ] Input fields full width on mobile
- [ ] Labels visible and associated
- [ ] Error messages clear
- [ ] Placeholder text readable
- [ ] Form submission works
- [ ] Keyboard works on mobile

### Images
- [ ] No horizontal scrolling
- [ ] Scale appropriately
- [ ] Load correctly on all sizes
- [ ] Alt text present
- [ ] Border radius works
- [ ] Product images visible

### Grids & Flexbox
- [ ] Items don't overflow
- [ ] Gap spacing appropriate
- [ ] Wrapping works correctly
- [ ] Alignment consistent
- [ ] Responsive columns work

## Performance Tests

- [ ] Page loads quickly on mobile (< 3s)
- [ ] No layout shifts on load
- [ ] Scrolling smooth on mobile
- [ ] Touch interactions responsive
- [ ] No horizontal scrolling
- [ ] Images optimized

## Accessibility Tests

- [ ] Tab navigation works
- [ ] Focus visible on interactive elements
- [ ] Color contrast passes WCAG AA
- [ ] Touch targets are large enough
- [ ] Form labels associated
- [ ] Semantic HTML used

## Browser & Device Testing

### Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile
- [ ] Safari Mobile

### Real Devices
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Plus (430px)
- [ ] Samsung S22 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1440px+)

## Orientation Tests

### Portrait Mode
- [ ] All components display correctly
- [ ] No overlapping elements
- [ ] Text readable
- [ ] Buttons accessible

### Landscape Mode
- [ ] Layout adapts to wide viewport
- [ ] Navigation accessible
- [ ] Content centered
- [ ] No horizontal scrolling

## CSS Media Query Verification

### Check Each Breakpoint
- [ ] 1024px breakpoint active
- [ ] 768px breakpoint active
- [ ] 640px breakpoint active
- [ ] 480px breakpoint active

### Verify Styles Applied
- [ ] Font sizes change at breakpoints
- [ ] Padding/margins adjust
- [ ] Grid columns change
- [ ] Display properties toggle
- [ ] Widths constrain properly

## Common Issues Checklist

- [ ] No text too small to read
- [ ] No buttons too small to tap
- [ ] No horizontal scrolling (except intentional)
- [ ] No content cut off
- [ ] No overlapping text
- [ ] All images load
- [ ] All links clickable
- [ ] Forms submittable
- [ ] No stretched images
- [ ] Proper color contrast

## Responsive Design Principles

✓ Mobile-first approach
✓ Flexible grids
✓ Flexible images
✓ Media queries
✓ Touch-friendly sizes
✓ Readable typography
✓ Performance optimized
✓ Accessible markup

## Testing Tools

- Chrome DevTools (F12)
- Firefox Responsive Design Mode (Ctrl+Shift+M)
- Safari Responsive Design Mode (Cmd+Option+R)
- Online tools: responsively.app, responsivedesignchecker.com
- Real devices (most important!)

## Automated Testing (Consider for Future)

```bash
# Run responsive tests with Lighthouse
npx lighthouse https://your-site.com --view

# Test with responsive design checker
# https://search.google.com/test/mobile-friendly
```

## Sign-Off

- [ ] All pages tested on mobile (320-480px)
- [ ] All pages tested on tablet (768px)
- [ ] All pages tested on desktop (1024px+)
- [ ] All breakpoints verified
- [ ] No horizontal scrolling issues
- [ ] All touch targets accessible
- [ ] Performance acceptable
- [ ] Accessibility standards met
- [ ] Ready for deployment

---

**Testing Date**: _________
**Tester Name**: _________
**Issues Found**: 

---

**Last Updated**: 2026-07-06
