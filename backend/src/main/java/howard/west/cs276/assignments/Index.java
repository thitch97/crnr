package howard.west.cs276.assignments;

import howard.west.cs276.util.Pair;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileFilter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.LinkedList;
import java.util.List;
import java.util.SortedSet;

public class Index {

	// Term id -> (position in index file, doc frequency) dictionary
	private static Map<Integer, Pair<Long, Integer>> postingDict
		= new TreeMap<Integer, Pair<Long, Integer>>();
	// Doc name -> doc id dictionary
	private static Map<String, Integer> docDict
		= new TreeMap<String, Integer>();
	// Term -> term id dictionary
	private static Map<String, Integer> termDict
		= new TreeMap<String, Integer>();
	// Block queue
	private static LinkedList<File> blockQueue
		= new LinkedList<File>();

	// Total file counter
	private static int totalFileCount = 0;
	// Document counter
	private static int docIdCounter = 0;
	// Term counter
	private static int wordIdCounter = 0;
	// Index
	private static BaseIndex index = null;


	/*
	 * Write a posting list to the given file
	 * You should record the file position of this posting list
	 * so that you can read it back during retrieval
	 *
	 * */
        private static void writePosting(FileChannel fc, PostingList posting)
	    throws IOException {
	    // We delegate actually writing the index to the index
	    // object, but we just need to record the offset and
	    // posting list size in postingDict.
	    postingDict.put(posting.getTermId(),
			    new Pair<Long, Integer>(fc.position(), posting.getList().size()));
	    index.writePosting(fc, posting);
	}

    // Merge eliminating dups.
    // Very similar to what they did in lab3.
    private static List<Integer> mergeSortedList(List<Integer> first, List<Integer> second) {
	int i1 = 0;
	int i2 = 0;
	List<Integer> result = new ArrayList<Integer>();
	while (i1 < first.size() && i2 < second.size()) {
	    if (first.get(i1).compareTo(second.get(i2)) < 0) {
		result.add(first.get(i1++));
	    } else if (first.get(i1).compareTo(second.get(i2)) > 0) {
		result.add(second.get(i2++));
	    } else {
		// In this case we have a dup. Pick one, increment the other.
		result.add(second.get(i2++));
		i1++;
	    }
	}
	while (i1 < first.size()) {
	    result.add(first.get(i1++));
	}
	while (i2 < second.size()) {
	    result.add(second.get(i2++));
	}
	return result;
    }

    public static void mainIndex(String[] args) throws IOException {
		/* Get index */
		String className = "howard.west.cs276.assignments." + "Basic" + "Index";
		try {
			Class<?> indexClass = Class.forName(className);
			index = (BaseIndex) indexClass.newInstance();
		} catch (Exception e) {
			System.err
			    .println("Index method must be \"Basic\", \"VB\", or \"Gamma\"");
			throw new RuntimeException(e);
		}

		/* Get root directory */
		String root = args[1];
		File rootdir = new File(root);
		if (!rootdir.exists() || !rootdir.isDirectory()) {
			System.err.println("Invalid data directory: " + root);
			return;
		}

		/* Get output directory */
		String output = args[2];
		File outdir = new File(output);
		if (outdir.exists() && !outdir.isDirectory()) {
			System.err.println("Invalid output directory: " + output);
			return;
		}

		if (!outdir.exists()) {
			if (!outdir.mkdirs()) {
				System.err.println("Create output directory failure");
				return;
			}
		}

		/* A filter to get rid of all files starting with .*/
		FileFilter filter = new FileFilter() {
			@Override
			public boolean accept(File pathname) {
				String name = pathname.getName();
				return !name.startsWith(".");
			}
		};

		/* BSBI indexing algorithm */
		File[] dirlist = rootdir.listFiles(filter);

		/* For each block */
		for (File block : dirlist) {
			File blockFile = new File(output, block.getName());
			blockQueue.add(blockFile);

			File blockDir = new File(root, block.getName());
			File[] filelist = blockDir.listFiles(filter);

			// In-memory map from termId to PostingLists
			// for the documents in this block.
			Map<Integer, PostingList> posting_lists =
			    new TreeMap<Integer, PostingList>();

			/* For each file */
			for (File file : filelist){
				++totalFileCount;
				String fileName = block.getName() + "/" + file.getName();
				Integer currentDocId = docIdCounter++;
				docDict.put(fileName, currentDocId);
				BufferedReader reader = new BufferedReader(new FileReader(file));
				String line;
				while ((line = reader.readLine()) != null) {
				    String[] tokens = line.trim().split("\\s+");
				    for (String token : tokens) {
					// Get or assign a termId to this token.
					Integer termId = termDict.get(token);
					if (termId == null) {
					    termId = wordIdCounter++;
					    termDict.put(token, termId);
					}

					// Get or create a PostingList for this token.
					PostingList pl = posting_lists.get(termId);
					if (pl == null) {
					    pl = new PostingList(termId);
					    posting_lists.put(termId, pl);
					}

					// And finally add this doc to the posting list for this
					// token. We are careful to avoid dups.
					if (pl.getList().size() == 0 ||
					    pl.getList().get(pl.getList().size() - 1) != currentDocId) {
					    pl.getList().add(currentDocId);
					}
				    }
				}
				reader.close();
			}

			/* Sort and output */
			if (!blockFile.createNewFile()) {
			    System.err.println("Create new block failure.");
			    return;
			}

			RandomAccessFile bfc = new RandomAccessFile(blockFile, "rw");
			FileChannel fc = bfc.getChannel();

			for (Integer termId : posting_lists.keySet()) {
			    // Simply output the per-block index (that
			    // will be merged later).
			    index.writePosting(fc, posting_lists.get(termId));
			}
			bfc.close();
		}

		/* Required: output total number of files. */
		System.out.println(totalFileCount);

		/* Merge blocks */
		while (true) {
			if (blockQueue.size() <= 1)
				break;

			File b1 = blockQueue.removeFirst();
			File b2 = blockQueue.removeFirst();

			File combfile = new File(output, b1.getName() + "+" + b2.getName());
			if (!combfile.createNewFile()) {
				System.err.println("Create new block failure.");
				return;
			}

			RandomAccessFile bf1 = new RandomAccessFile(b1, "r");
			RandomAccessFile bf2 = new RandomAccessFile(b2, "r");
			RandomAccessFile mf = new RandomAccessFile(combfile, "rw");
			FileChannel bf1_fc = bf1.getChannel();
			FileChannel bf2_fc = bf2.getChannel();
			FileChannel mf_fc = mf.getChannel();

			// We merge the index in bf1 and bf2 onto new
			// file mf.  We use the fact that all indices
			// are sorted by termId, so we can do this as
			// 1-pass stream algorithm.
			PostingList pl_1 = index.readPosting(bf1_fc);
			PostingList pl_2 = index.readPosting(bf2_fc);
			while (pl_1 != null && pl_2 != null) {
			    if (pl_1.getTermId() < pl_2.getTermId()) {
				writePosting(mf_fc, pl_1);
				pl_1 = index.readPosting(bf1_fc);
			    } else if (pl_1.getTermId() > pl_2.getTermId()) {
				writePosting(mf_fc, pl_2);
				pl_2 = index.readPosting(bf2_fc);
			    } else {
				// Merge the two posting lists.
				PostingList merged_pl = new PostingList(pl_1.getTermId());
				merged_pl.getList().addAll(mergeSortedList(pl_1.getList(), pl_2.getList()));
				writePosting(mf_fc, merged_pl);
				pl_1 = index.readPosting(bf1_fc);
				pl_2 = index.readPosting(bf2_fc);
			    }
			}
			while (pl_1 != null) {
			    writePosting(mf_fc, pl_1);
			    pl_1 = index.readPosting(bf1_fc);
			}
			while (pl_2 != null) {
			    writePosting(mf_fc, pl_2);
			    pl_2 = index.readPosting(bf2_fc);
			}

			bf1.close();
			bf2.close();
			mf.close();
			b1.delete();
			b2.delete();
			blockQueue.add(combfile);
		}

		/* Dump constructed index back into file system */
		File indexFile = blockQueue.removeFirst();
		indexFile.renameTo(new File(output, "corpus.index"));

		BufferedWriter termWriter = new BufferedWriter(new FileWriter(new File(
				output, "term.dict")));
		for (String term : termDict.keySet()) {
			termWriter.write(term + "\t" + termDict.get(term) + "\n");
		}
		termWriter.close();

		BufferedWriter docWriter = new BufferedWriter(new FileWriter(new File(
				output, "doc.dict")));
		for (String doc : docDict.keySet()) {
			docWriter.write(doc + "\t" + docDict.get(doc) + "\n");
		}
		docWriter.close();

		BufferedWriter postWriter = new BufferedWriter(new FileWriter(new File(
				output, "posting.dict")));
		for (Integer termId : postingDict.keySet()) {
			postWriter.write(termId + "\t" + postingDict.get(termId).getFirst()
					+ "\t" + postingDict.get(termId).getSecond() + "\n");
		}
		postWriter.close();
	}

}
