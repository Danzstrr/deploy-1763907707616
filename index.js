app.post('/api/youtube/download', requireAuth, async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({
      error: "URL video YouTube wajib diisi."
    });
  }

  try {
    const downloadResponse = await axios.get(`https://restapi-v2.simplebot.my.id/download/ytmp3?url=${encodeURIComponent(url)}`);
    
    if (downloadResponse.data && downloadResponse.data.result) {
      return res.json({
        success: true,
        audioUrl: downloadResponse.data.result
      });
    } else {
      return res.status(404).json({
        error: "Gagal mendapatkan URL download"
      });
    }
  } catch (error) {
    console.error('YouTube Download Error:', error);
    res.status(500).json({
      error: error.message || "Terjadi kesalahan saat mendownload audio"
    });
  }
});
