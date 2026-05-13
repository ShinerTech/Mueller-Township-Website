import os
import yaml
import markdown
import re
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

# Setup Jinja2 environment
env = Environment(loader=FileSystemLoader('.'))

def parse_front_matter(content):
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            fm = yaml.safe_load(parts[1])
            body = parts[2]
            return fm, body
    return {}, content

def build():
    print("Building blog...")
    posts = []
    
    os.makedirs('_posts', exist_ok=True)
    os.makedirs('blog', exist_ok=True)
    
    for filename in os.listdir('_posts'):
        if filename.endswith('.md'):
            with open(os.path.join('_posts', filename), 'r', encoding='utf-8') as f:
                content = f.read()
            
            fm, md_content = parse_front_matter(content)
            
            # Format date
            date_obj = fm.get('date', datetime.now())
            if isinstance(date_obj, str):
                try:
                    date_obj = datetime.strptime(date_obj, '%Y-%m-%d')
                except:
                    date_obj = datetime.now()
            
            fm['formatted_date'] = date_obj.strftime('%B %#d, %Y')
            fm['date_obj'] = date_obj
            
            # Create URL
            url = fm.get('permalink')
            if not url:
                slug = filename.replace('.md', '')
                url = f"/blog/{slug}.htm"
                fm['permalink'] = url
            fm['url'] = url
            
            # Calculate relative root
            out_path = url.lstrip('/')
            depth = out_path.count('/')
            relative_root = '../' * depth if depth > 0 else './'

            # Extract excerpt
            html_content = markdown.markdown(md_content)
            
            # Fix absolute paths in markdown content
            html_content = re.sub(r'href="/([^/])', f'href="{relative_root}\\1', html_content)
            html_content = re.sub(r'src="/([^/])', f'src="{relative_root}\\1', html_content)
            
            fm['content'] = html_content
            
            excerpt = html_content.split('</p>')[0].replace('<p>', '')
            excerpt = re.sub('<[^<]+>', '', excerpt)
            fm['excerpt'] = excerpt[:100] + "..." if len(excerpt) > 100 else excerpt
            
            posts.append(fm)
            
            # Calculate relative root
            out_path = url.lstrip('/')
            depth = out_path.count('/')
            relative_root = '../' * depth if depth > 0 else './'

            # Render post
            post_template = env.get_template('_layouts/post.html')
            rendered = post_template.render(page=fm, post_content=html_content, relative_root=relative_root)
            
            # Write to file
            out_path = url.lstrip('/')
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(rendered)
            print(f"Generated {out_path}")

    # Sort posts by date descending
    posts.sort(key=lambda x: x.get('date_obj', datetime.now()), reverse=True)

    # Generate blog index
    blog_template = env.get_template('blog/index_template.html')
    rendered_index = blog_template.render(site={'posts': posts}, page={'url': '/blog/index.htm', 'title': 'Blog'}, relative_root='../')
    with open('blog/index.htm', 'w', encoding='utf-8') as f:
        f.write(rendered_index)
    print("Generated blog/index.htm")
    print("Build complete!")

if __name__ == '__main__':
    build()
