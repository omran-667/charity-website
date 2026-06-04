const fs = require('fs');
const path = require('path');
(async function(){
  const bundle = path.join(__dirname, '..', 'dist', 'client', 'assets');
  const files = fs.readdirSync(bundle).filter(f=>f.endsWith('.js'));
  for(const file of files){
    const full = path.join(bundle, file);
    const content = fs.readFileSync(full, 'utf8');
    const idx = content.indexOf('Invariant failed');
    if(idx!==-1){
      const before = content.slice(Math.max(0, idx-200), idx+200);
      const line = content.slice(0, idx).split('\n').length;
      const col = idx - content.lastIndexOf('\n', idx) - 1;
      console.log('Found in', file);
      console.log('Line', line, 'Col', col);
      console.log('Context:\n', before);
      const mapFile = full + '.map';
      if(fs.existsSync(mapFile)){
        try{
          const {SourceMapConsumer} = require('source-map');
          const rawSourceMap = JSON.parse(fs.readFileSync(mapFile,'utf8'));
          const consumer = await new SourceMapConsumer(rawSourceMap);
          const orig = consumer.originalPositionFor({line, column: col});
          console.log('Mapped to:', orig);
          consumer.destroy && consumer.destroy();
        }catch(err){
          console.error('Error loading source-map:', err.message);
        }
      }else{
        console.log('No map found for', file);
      }
    }
  }
})();
