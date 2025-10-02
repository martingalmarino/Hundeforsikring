const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Handle Vercel-style rewrites
    if (pathname.startsWith('/forsikring/') && !pathname.endsWith('/')) {
        // Add trailing slash for directory requests
        pathname = pathname + '/';
    }
    
    // Handle specific routes
    if (pathname === '/forsikring/') {
        pathname = '/forsikring/index.html';
    } else if (pathname.match(/^\/forsikring\/[^\/]+\/$/)) {
        // Extract kommune name and serve the index.html
        const kommune = pathname.split('/')[2];
        pathname = `/forsikring/${kommune}/index.html`;
    } else if (pathname === '/faq/') {
        pathname = '/faq/index.html';
    } else if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Remove leading slash and build file path
    const filePath = path.join(__dirname, pathname.substring(1));
    
    // Security check - prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
                return;
            }
            
            // Get file extension and set content type
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'text/plain';
            
            // Set headers
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor local iniciado en http://localhost:${PORT}`);
    console.log(`📁 Sirviendo archivos desde: ${__dirname}`);
    console.log(`🔄 Sin caché - cambios visibles inmediatamente`);
    console.log(`\n🌐 Abre tu navegador en: http://localhost:${PORT}`);
    console.log(`\n⏹️  Para detener el servidor: Ctrl+C`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo servidor...');
    server.close(() => {
        console.log('✅ Servidor detenido');
        process.exit(0);
    });
});
