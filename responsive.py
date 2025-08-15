#!/usr/bin/env python3
"""
Flonze Website Responsive Design Validator
Checks if the website is properly responsive across different screen sizes
"""

import json
import os
from pathlib import Path

class ResponsiveValidator:
    def __init__(self):
        self.breakpoints = {
            'xs': 480,      # Extra small devices
            'sm': 576,      # Small devices
            'md': 768,      # Medium devices (tablets)
            'lg': 992,      # Large devices (desktops)
            'xl': 1200,     # Extra large devices
            'xxl': 1400     # Extra extra large devices
        }
        
    def check_css_breakpoints(self, css_file):
        """Check if CSS file has proper responsive breakpoints"""
        try:
            with open(css_file, 'r', encoding='utf-8') as f:
                css_content = f.read()
            
            found_breakpoints = []
            
            # Check for media queries
            for name, width in self.breakpoints.items():
                if f"max-width: {width}px" in css_content or f"min-width: {width}px" in css_content:
                    found_breakpoints.append(name)
            
            return {
                'status': 'pass' if len(found_breakpoints) >= 3 else 'fail',
                'found_breakpoints': found_breakpoints,
                'total_breakpoints': len(found_breakpoints)
            }
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def check_viewport_meta(self, html_file):
        """Check if HTML has proper viewport meta tag"""
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            has_viewport = 'name="viewport"' in html_content
            has_proper_content = 'width=device-width, initial-scale=1.0' in html_content
            
            return {
                'status': 'pass' if has_viewport and has_proper_content else 'fail',
                'has_viewport': has_viewport,
                'has_proper_content': has_proper_content
            }
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def check_mobile_menu(self, js_file):
        """Check if JavaScript has mobile menu functionality"""
        try:
            with open(js_file, 'r', encoding='utf-8') as f:
                js_content = f.read()
            
            has_hamburger = 'hamburger' in js_content.lower()
            has_mobile_menu = 'mobile' in js_content.lower() and 'menu' in js_content.lower()
            has_toggle = 'toggle' in js_content.lower()
            
            return {
                'status': 'pass' if has_hamburger and has_mobile_menu and has_toggle else 'fail',
                'has_hamburger': has_hamburger,
                'has_mobile_menu': has_mobile_menu,
                'has_toggle': has_toggle
            }
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def validate_website(self, base_path='.'):
        """Validate entire website for responsiveness"""
        results = {
            'css_check': None,
            'html_check': None,
            'js_check': None,
            'overall_status': 'fail'
        }
        
        # Check CSS
        css_file = os.path.join(base_path, 'style.css')
        if os.path.exists(css_file):
            results['css_check'] = self.check_css_breakpoints(css_file)
        
        # Check HTML
        html_file = os.path.join(base_path, 'index.html')
        if os.path.exists(html_file):
            results['html_check'] = self.check_viewport_meta(html_file)
        
        # Check JavaScript
        js_file = os.path.join(base_path, 'script.js')
        if os.path.exists(js_file):
            results['js_check'] = self.check_mobile_menu(js_file)
        
        # Determine overall status
        all_passed = all(
            check and check.get('status') == 'pass' 
            for check in [results['css_check'], results['html_check'], results['js_check']]
            if check is not None
        )
        
        results['overall_status'] = 'pass' if all_passed else 'fail'
        
        return results
    
    def generate_report(self, results):
        """Generate a readable report"""
        report = []
        report.append("=" * 50)
        report.append("FLONZE WEBSITE RESPONSIVE DESIGN REPORT")
        report.append("=" * 50)
        
        # CSS Check
        if results['css_check']:
            css = results['css_check']
            status = "✅ PASS" if css['status'] == 'pass' else "❌ FAIL"
            report.append(f"\nCSS Responsiveness: {status}")
            if 'found_breakpoints' in css:
                report.append(f"  - Breakpoints found: {css['total_breakpoints']}")
                report.append(f"  - Breakpoints: {', '.join(css['found_breakpoints'])}")
        
        # HTML Check
        if results['html_check']:
            html = results['html_check']
            status = "✅ PASS" if html['status'] == 'pass' else "❌ FAIL"
            report.append(f"\nHTML Viewport Meta: {status}")
            report.append(f"  - Has viewport tag: {'✅' if html.get('has_viewport') else '❌'}")
            report.append(f"  - Proper content: {'✅' if html.get('has_proper_content') else '❌'}")
        
        # JavaScript Check
        if results['js_check']:
            js = results['js_check']
            status = "✅ PASS" if js['status'] == 'pass' else "❌ FAIL"
            report.append(f"\nJavaScript Mobile Menu: {status}")
            report.append(f"  - Hamburger menu: {'✅' if js.get('has_hamburger') else '❌'}")
            report.append(f"  - Mobile menu logic: {'✅' if js.get('has_mobile_menu') else '❌'}")
            report.append(f"  - Toggle functionality: {'✅' if js.get('has_toggle') else '❌'}")
        
        # Overall Status
        overall = "✅ RESPONSIVE" if results['overall_status'] == 'pass' else "❌ NEEDS WORK"
        report.append(f"\nOVERALL STATUS: {overall}")
        
        report.append("\n" + "=" * 50)
        
        return "\n".join(report)

def main():
    """Main function to run the validator"""
    validator = ResponsiveValidator()
    
    # Get the current directory (where the script is run)
    current_dir = os.getcwd()
    
    print("Validating Flonze website responsiveness...")
    print(f"Checking files in: {current_dir}")
    
    # Run validation
    results = validator.validate_website(current_dir)
    
    # Generate and print report
    report = validator.generate_report(results)
    print(report)
    
    # Save report to file
    with open('responsive_report.txt', 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\nReport saved to: responsive_report.txt")
    
    # Return exit code based on results
    return 0 if results['overall_status'] == 'pass' else 1

if __name__ == "__main__":
    exit(main())