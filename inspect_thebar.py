import urllib.request, re, json

data = urllib.request.urlopen("https://ke.thebar.com/js/app.631d23b8.js").read().decode("utf-8", errors="ignore")

# Find route definitions
route_blocks = re.findall(r'\{path:"[^"]+",name:"[^"]*"[^}]*\}', data)
for r in route_blocks[:20]:
    print("ROUTE:", r)

# Find all api endpoints
matches = re.findall(r'\.(?:get|post|put)\([`\'"]([^`\'"]+)[`\'"]', data)
print("\nENDPOINTS:")
for m in sorted(set(matches)):
    print(m)
