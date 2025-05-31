# Step 1: Build the app using Node 18
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖定义文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖（不包含 devDependencies）
RUN pnpm install --frozen-lockfile

# 复制其他文件（忽略 .dockerignore 中排除的内容）
COPY . .

# 构建应用
RUN pnpm build

# Step 2: Use official nginx to serve the app
FROM nginx:stable-alpine

# 删除默认 nginx 静态页面
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建产物
COPY --from=builder /app/svelte-dist /usr/share/nginx/html

# 如果存在自定义 nginx 配置则覆盖默认配置
COPY --from=builder /app/docker/prod/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]